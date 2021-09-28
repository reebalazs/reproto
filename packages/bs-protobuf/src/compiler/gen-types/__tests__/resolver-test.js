/* global test, describe, expect */

import { Resolver, couldNotResolve } from "../resolver";

function expectCouldNotResolve(resolver) {
  expect(resolver).toBe(couldNotResolve);
  expect(resolver.data).toBe(undefined);
  expect(resolver.protoJsPath).toBe(undefined);
  expect(resolver.chain).toBe(null);
  expect(resolver.prefix).toEqual([]);
  expect(resolver.baseLevel).toEqual(null);
}

describe("gen-types Resolver", () => {
  test("constructor", () => {
    const resolver = new Resolver("{DATA}", "PROTO_JS_PATH");
    expect(resolver.data).toBe("{DATA}");
    expect(resolver.protoJsPath).toBe("PROTO_JS_PATH");
    expect(resolver.chain).toBe(null);
    expect(resolver.prefix).toEqual([]);
    expect(resolver.baseLevel).toEqual(null);
  });

  describe("next", () => {
    test("hit", () => {
      const resolver = new Resolver(
        { nested: { alpha: { nested: { beta: "{BETA}" } } } },
        "PROTO_JS_PATH"
      );
      const resolver1 = resolver.next("alpha");
      expect(resolver1.data).toEqual({ nested: { beta: "{BETA}" } });
      expect(resolver1.protoJsPath).toBe("PROTO_JS_PATH");
      expect(resolver1.chain).toBe(resolver);
      expect(resolver1.prefix).toEqual(["alpha"]);
      expect(resolver1.baseLevel).toEqual(null);
      const resolver2 = resolver1.next("beta");
      expect(resolver2.data).toEqual("{BETA}");
      expect(resolver2.protoJsPath).toBe("PROTO_JS_PATH");
      expect(resolver2.chain).toBe(resolver1);
      expect(resolver2.prefix).toEqual(["alpha", "beta"]);
      expect(resolver2.baseLevel).toEqual(null);
    });

    test("miss", () => {
      const resolver = new Resolver(
        { nested: { alpha: { nested: { beta: "{BETA}" } } } },
        "PROTO_JS_PATH"
      );
      const resolver1 = resolver.next("NOSUCH");
      expectCouldNotResolve(resolver1);
      const resolver1b = resolver.next("alpha");
      const resolver2 = resolver1b.next("NOSUCH");
      expectCouldNotResolve(resolver2);
    });
  });

  describe("lookup", () => {
    test("hit", () => {
      const resolver = new Resolver(
        { nested: { alpha: { nested: { beta: "{BETA}" } } } },
        "PROTO_JS_PATH"
      );
      const resolver1 = resolver.lookup("alpha.beta");
      expect(resolver1.data).toEqual("{BETA}");
      expect(resolver1.protoJsPath).toBe("PROTO_JS_PATH");
      expect(resolver1.chain.chain).toBe(resolver);
      expect(resolver1.relativePath).toEqual("Alpha.Beta");
    });

    test("hit chained", () => {
      const resolver = new Resolver(
        {
          nested: {
            alpha: { nested: { beta: { nested: { gamma: "{GAMMA}" } } } },
          },
        },
        "PROTO_JS_PATH"
      );
      const resolver1 = resolver.lookup("alpha");
      expect(resolver1.protoJsPath).toBe("PROTO_JS_PATH");
      expect(resolver1.chain).toBe(resolver);
      expect(resolver1.relativePath).toEqual("Alpha");
      const resolver2 = resolver1.lookup("beta.gamma");
      expect(resolver2.data).toEqual("{GAMMA}");
      expect(resolver2.protoJsPath).toBe("PROTO_JS_PATH");
      expect(resolver2.chain.chain).toBe(resolver1);
      expect(resolver2.relativePath).toEqual("Alpha.Beta.Gamma");
    });

    test("miss", () => {
      const resolver = new Resolver(
        { nested: { alpha: { nested: { beta: "{BETA}" } } } },
        "PROTO_JS_PATH"
      );
      const resolver1 = resolver.lookup("alpha.gamma");
      expectCouldNotResolve(resolver1);
    });

    describe("relative", () => {
      test("from root", () => {
        const resolver = new Resolver(
          {
            nested: {
              alpha: {
                nested: {
                  beta: { nested: { gamma: "{GAMMA}" } },
                  delta: { nested: { epsilon: "{EPSILON}" } },
                },
              },
            },
          },
          "PROTO_JS_PATH"
        );
        const resolver1 = resolver.lookup("alpha.beta.gamma");
        expect(resolver1.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver1.chain.chain.chain).toBe(resolver);
        expect(resolver1.relativePath).toEqual("Alpha.Beta.Gamma");
        const resolver2 = resolver1.lookup("delta");
        expect(resolver2.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver2.chain.chain).toBe(resolver);
        expect(resolver2.relativePath).toEqual("Alpha.Delta");
        const resolver3 = resolver1.lookup("delta.epsilon");
        expect(resolver3.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver3.chain.chain.chain).toBe(resolver);
        expect(resolver3.relativePath).toEqual("Alpha.Delta.Epsilon");
      });

      test("from leaf", () => {
        const resolver = new Resolver(
          {
            nested: {
              alpha: {
                nested: {
                  beta: { nested: { gamma: "{GAMMA}" } },
                  delta: { nested: { epsilon: "{EPSILON}" } },
                },
              },
            },
          },
          "PROTO_JS_PATH"
        );
        const resolver1 = resolver.next("alpha").next("beta").next("gamma");
        expect(resolver1.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver1.chain.chain.chain).toBe(resolver);
        expect(resolver1.relativePath).toEqual("Alpha.Beta.Gamma");
        const resolver2 = resolver1.lookup("delta");
        expect(resolver2.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver2.chain.chain).toBe(resolver);
        expect(resolver2.relativePath).toEqual("Delta");
        const resolver3 = resolver1.lookup("delta.epsilon");
        expect(resolver3.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver3.chain.chain.chain).toBe(resolver);
        expect(resolver3.relativePath).toEqual("Delta.Epsilon");
      });

      test("chained with minimum", () => {
        const resolver = new Resolver(
          {
            nested: {
              alpha: {
                nested: {
                  beta: { nested: { gamma: "{GAMMA}" } },
                  delta: { nested: { epsilon: "{EPSILON}" } },
                },
              },
            },
          },
          "PROTO_JS_PATH"
        );
        const resolver1 = resolver.next("alpha").next("beta").next("gamma");
        expect(resolver1.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver1.chain.chain.chain).toBe(resolver);
        expect(resolver1.relativePath).toEqual("Alpha.Beta.Gamma");
        const resolver2 = resolver1.lookup("beta");
        expect(resolver2.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver2.chain.chain).toBe(resolver);
        expect(resolver2.relativePath).toEqual("Beta");
        const resolver3 = resolver2.lookup("delta.epsilon");
        expect(resolver3.protoJsPath).toBe("PROTO_JS_PATH");
        expect(resolver3.chain.chain.chain).toBe(resolver);
        expect(resolver3.relativePath).toEqual("Delta.Epsilon");
      });
    });
  });
});

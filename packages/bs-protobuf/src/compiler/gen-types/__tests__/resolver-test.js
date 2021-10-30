/* global test, describe, expect */

import { Resolver, couldNotResolve, specialModuleTypes } from "../resolver";

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

      test("inner", () => {
        const resolver = new Resolver(
          {
            nested: {
              alpha: {
                nested: {
                  beta: { nested: { gamma: "{GAMMA}" } },
                  delta: { nested: { epsilon: "{EPSILON-INNER}" } },
                },
              },
              delta: { nested: { epsilon: "{EPSILON-OUTER}" } },
            },
          },
          "PROTO_JS_PATH"
        );
        const resolver1 = resolver.next("alpha").next("beta").next("gamma");
        const resolver2 = resolver1.lookup("delta");
        expect(resolver2.data).toEqual({
          nested: { epsilon: "{EPSILON-INNER}" },
        });
        const resolver3 = resolver1.lookup("delta.epsilon");
        expect(resolver3.data).toBe("{EPSILON-INNER}");
      });

      test("outer", () => {
        const resolver = new Resolver(
          {
            nested: {
              alpha: {
                nested: {
                  beta: { nested: { gamma: "{GAMMA}" } },
                  delta: { nested: { epsilon: "{EPSILON-INNER}" } },
                },
              },
              delta: { nested: { epsilon: "{EPSILON-OUTER}" } },
            },
          },
          "PROTO_JS_PATH"
        );
        const resolver1 = resolver.next("alpha").next("beta").next("gamma");
        // dot prefix looks up from the root
        const resolver2 = resolver1.lookup(".delta");
        expect(resolver2.data).toEqual({
          nested: { epsilon: "{EPSILON-OUTER}" },
        });
        // dot prefix looks up from the root
        const resolver3 = resolver1.lookup(".delta.epsilon");
        expect(resolver3.data).toBe("{EPSILON-OUTER}");
      });
    });
  });

  const makeWithPrefix = (prefix) => new Resolver(null, null, null, prefix);

  describe("flattenedName", () => {
    test("path conversion", () => {
      expect(makeWithPrefix(["alpha"]).flattenedName).toBe("Alpha");
      expect(makeWithPrefix(["Alpha"]).flattenedName).toBe("Alpha");
      expect(makeWithPrefix(["ALPHA"]).flattenedName).toBe("ALPHA");
      expect(makeWithPrefix(["alpha", "beta", "gamma"]).flattenedName).toBe(
        "Alpha__beta__gamma"
      );
    });
    test("underscore conversion", () => {
      expect(makeWithPrefix(["a_b_c_d"]).flattenedName).toBe("A_Xb_Xc_Xd");
      expect(makeWithPrefix(["alpha", "beta_", "gamma__"]).flattenedName).toBe(
        "Alpha__beta_X__gamma_X_X"
      );
    });
  });

  describe("moduleName", () => {
    const moduleName = (name) => `${specialModuleTypes}.${name}`;
    test("path conversion", () => {
      expect(makeWithPrefix(["alpha"]).moduleName).toBe(moduleName("Alpha"));
      expect(makeWithPrefix(["Alpha"]).moduleName).toBe(moduleName("Alpha"));
      expect(makeWithPrefix(["ALPHA"]).moduleName).toBe(moduleName("ALPHA"));
      expect(makeWithPrefix(["alpha", "beta", "gamma"]).moduleName).toBe(
        moduleName("Alpha__beta__gamma")
      );
    });
    test("underscore conversion", () => {
      expect(makeWithPrefix(["a_b_c_d"]).moduleName).toBe(
        moduleName("A_Xb_Xc_Xd")
      );
      expect(makeWithPrefix(["alpha", "beta_", "gamma__"]).moduleName).toBe(
        moduleName("Alpha__beta_X__gamma_X_X")
      );
    });
  });

  describe("name", () => {
    test("works", () => {
      expect(makeWithPrefix([]).name).toBe(undefined);
      expect(makeWithPrefix(["alpha"]).name).toBe("alpha");
      expect(makeWithPrefix(["alpha", "beta"]).name).toBe("beta");
      expect(makeWithPrefix(["alpha", "beta", "gamma"]).name).toBe("gamma");
    });
    test("with no prefix", () => {
      expect(makeWithPrefix(undefined).name).toBe(undefined);
    });
  });

  describe("packageName", () => {
    test("works", () => {
      expect(makeWithPrefix([]).packageName).toBe("");
      expect(makeWithPrefix(["alpha"]).packageName).toBe("alpha");
      expect(makeWithPrefix(["alpha", "beta"]).packageName).toBe("alpha.beta");
      expect(makeWithPrefix(["alpha", "beta", "gamma"]).packageName).toBe(
        "alpha.beta.gamma"
      );
    });
    test("with no prefix", () => {
      expect(makeWithPrefix(undefined).packageName).toBe("");
    });
  });
});

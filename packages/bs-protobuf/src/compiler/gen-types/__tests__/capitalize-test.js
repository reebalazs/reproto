/* global test, expect */

import { capitalize, decapitalize } from "../capitalize";

test("capitalize", () => {
  expect(capitalize("small")).toBe("Small");
  expect(capitalize("camelCase")).toBe("CamelCase");
  expect(capitalize("Large")).toBe("Large");
  expect(capitalize("LargeCamel")).toBe("LargeCamel");
});

test("decapitalize", () => {
  expect(decapitalize("small")).toBe("small");
  expect(decapitalize("camelCase")).toBe("camelCase");
  expect(decapitalize("Large")).toBe("large");
  expect(decapitalize("LargeCamel")).toBe("largeCamel");
});

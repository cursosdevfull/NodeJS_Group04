const edad = require("./anonima");

jest.mock("./anonima.js");

test("Get Score", () => {
  edad.mockImplementationOnce(() => 100);
  edad.mockImplementationOnce(() => 200);
  edad.mockImplementationOnce(() => 300);
  edad.mockImplementation(() => 50);
  edad.mockImplementation(() => 500);
  edad.mockImplementation(() => 5000);

  expect(edad()).toBe(100);
  expect(edad()).toBe(200);
  expect(edad()).toBe(300);
  expect(edad()).toBe(5000);
  expect(edad()).toBe(5000);
});

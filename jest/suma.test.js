const suma = require("./suma");

test("sumar dos números positivos: 4 + 6 = 10", () => {
  expect(suma(4, 6)).toBe(10);
});

test("sumar dos números negativos: -8 - 12 = -20", () => {
  expect(suma(-8, -12)).toBe(-20);
});

test("sumar un positivo y un negativo: 4 - 6 = -2", () => {
  expect(suma(4, -6)).toBe(-2);
});

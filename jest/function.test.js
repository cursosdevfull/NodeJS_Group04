const forEach = require("./function");

const mockCallback = jest.fn((x) => x + 1);

const listUsers = [{ name: "user01" }, { name: "user02" }, { name: "user03" }];

test("Testing function callback", () => {
  const items = [2, 3, 4];

  forEach(items, mockCallback);

  expect(mockCallback.mock.calls.length).toBe(items.length);
  expect(mockCallback.mock.calls[0][0]).toBe(items[0]);
  expect(mockCallback.mock.calls[1][0]).toBe(items[1]);

  expect(mockCallback.mock.results[0].value).toBe(items[0] + 1);
  expect(mockCallback.mock.results[1].value).toBe(items[1] + 1);
});

test("Testing async operations", async () => {
  const find = jest.fn();
  find.mockResolvedValue(listUsers);
  const results = await find();

  expect(results.length).toBe(listUsers.length);
  expect(results).toBe(listUsers);
});

test("Testing async value", async () => {
  const maxValue = jest.fn();
  maxValue.mockResolvedValue(50);

  const valueReturned = await maxValue();

  expect(valueReturned).toBe(50);
});

test("Testing controller", async () => {
  const getRepository = jest.fn().mockReturnValue({
    find: jest.fn().mockResolvedValue(listUsers),
  });

  const userRepository = getRepository("User");
  const users = await userRepository.find();

  expect(users).toBe(listUsers);
});

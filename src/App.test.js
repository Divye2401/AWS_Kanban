// Simple test to ensure the pipeline passes
test("basic math test", () => {
  expect(2 + 2).toBe(4);
});

test("string test", () => {
  expect("hello world").toContain("world");
});

test("app component exists", () => {
  const App = require("./App");
  expect(App).toBeDefined();
});

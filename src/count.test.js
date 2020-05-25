//reducer
// function counter(count, action) {
//   if (action.type === "increment") {
//     return count + 1;
//   } else if (action.type === "decrement") {
//     return count - 1;
//   } else if (action.type === "reset") {
//     return 0;
//   }
//   return count;
// }
function counter(count, action) {
  switch (action.type) {
    case "increment":
      return count + 1;
    case "decrement":
      return count - 1;
    case "reset":
      return 0;
    default:
      return count;
  }
}
test("counter", () => {
  expect(counter(0, { type: "increment" })).toBe(1);
  expect(counter(1, { type: "increment" })).toBe(2);

  expect(counter(0, { type: "decrement" })).toBe(-1);
  expect(counter(-999, { type: "decrement" })).toBe(-1000);

  expect(counter(2, { type: "reset" })).toBe(0);
  expect(counter(0, { type: "unknown" })).toBe(0);
});

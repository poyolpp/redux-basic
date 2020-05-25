import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; // import "./styles.css";
function counterReducer(count = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return count + 1;
    case "DECREMENT":
      return count - 1;
    case "RESET":
      return 0;
    default:
      return count;
  }
}

const store = createStore(counterReducer, applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
});

//action creator
const increment = () => ({ type: "INCREMENT" });

const decrement = () => ({ type: "DECREMENT" });

const reset = () => ({ type: "RESET" });

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(reset());
store.dispatch(decrement());
store.dispatch(decrement());

console.log(store.getState());

const counterElm = document.getElementById("counter");

function render() {
  counterElm.textContent = `Count: ${store.getState()}`;
}

render();
store.subscribe(() => {
  render();
});

const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const resetBtn = document.getElementById("resetBtn");

incrementBtn.addEventListener("click", () => store.dispatch(increment()));
decrementBtn.addEventListener("click", () => store.dispatch(decrement()));
resetBtn.addEventListener("click", () => store.dispatch(reset()));

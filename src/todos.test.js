import deepFreeze from "deepfreeze";

let id = 1;
function todosReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: id++,
          text: action.text,
          completed: action.completed
        }
      ];

    case "TOGGLE_TODO":
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed
        };
      });

    case "REMOVE_TODO":
      return state.filter(todo => {
        if (todo.id === action.id) {
          return false;
        }
        return true;
      });

    default:
      return state;
  }
}

test("todos reducer", () => {
  const todoBefore = [];
  const todoAfter = [
    {
      id: 1,
      text: "Learn React",
      completed: true
    }
  ];
  deepFreeze(todoBefore);

  expect(
    todosReducer(todoBefore, {
      type: "ADD_TODO",
      text: "Learn React",
      completed: true
    })
  ).toEqual(todoAfter);
});

test("todos reducer, add more todo", () => {
  const todoBefore = [
    {
      id: 1,
      text: "Learn React",
      completed: true
    }
  ];
  const todoAfter = [
    {
      id: 1,
      text: "Learn React",
      completed: true
    },
    {
      id: 2,
      text: "Learn Redux",
      completed: false
    }
  ];
  deepFreeze(todoBefore);

  expect(
    todosReducer(todoBefore, {
      type: "ADD_TODO",
      text: "Learn Redux",
      completed: false
    })
  ).toEqual(todoAfter);
});

test("toggle todo", () => {
  const todoBefore = [
    {
      id: 1,
      text: "Learn React",
      completed: false
    }
  ];
  const todoAfter = [
    {
      id: 1,
      text: "Learn React",
      completed: true
    }
  ];
  deepFreeze(todoBefore);
  // todosReducer(todoBefore, { type: 'TOGGLE_TODO', id: 1 })
  expect(todosReducer(todoBefore, { type: "TOGGLE_TODO", id: 1 })).toEqual(
    todoAfter
  );
});

test("remove todo", () => {
  const todoBefore = [
    {
      id: 1,
      text: "Learn React",
      completed: false
    }
  ];
  const todoAfter = [];

  deepFreeze(todoBefore);

  expect(todosReducer(todoBefore, { type: "REMOVE_TODO", id: 1 })).toEqual(
    todoAfter
  );
});

import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            priority: 'low',
            todo: "message",
            completed: false
        }
    ],
    progressTodos: [
      {
        id: 1,
        priority: 'low',
        todo: "message",
        completed: false
      }
    ],
    completedTodos: [
      {
        id: 1,
        priority: 'low',
        todo: "message",
        completed: false
      }
    ],
    addTodo: (todo) => {},
    editTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}
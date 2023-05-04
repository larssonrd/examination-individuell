import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filter: 'all',
};

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const todo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (todo) {
        todo.content = action.payload.content;
      }
    },
    completeTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompletedTodos: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    loadTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
  setFilter,
  clearCompletedTodos,
  loadTodos,
} = todosSlice.actions;

export const selectTodos = (state) =>
  filterTodos(state.todos.todos, state.todos.filter);
export const selectFilter = (state) => state.todos.filter;

export default todosSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
  },
});

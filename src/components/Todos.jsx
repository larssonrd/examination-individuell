import React, { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moonIcon from '../images/icon-moon.svg';
import sunIcon from '../images/icon-sun.svg';
import Todo from './Todo';
import initialTodos from '../data/initialTodos.json';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode, toggleTheme } from '../store/slices/themeSlice';
import {
  addTodo,
  clearCompletedTodos,
  selectFilter,
  selectTodos,
  setFilter,
  loadTodos,
} from '../store/slices/todosSlice';
import styles from './Todos.module.scss';

function Todos() {
  const inputRef = useRef();

  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos(initialTodos));
  }, [dispatch]);

  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);

  let todosToRender;
  let activeTodosNumber = 0;

  if (filter === 'active') {
    todosToRender = todos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    todosToRender = todos.filter((todo) => todo.completed);
  } else {
    todosToRender = todos;
  }

  activeTodosNumber = todos.filter((todo) => !todo.completed).length;

  const submitTodo = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      dispatch(
        addTodo({
          id: uuidv4(),
          content: inputRef.current.value,
          completed: false,
        })
      );
    }
    inputRef.current.value = '';
  };

  const setFilterHandler = (filter) => {
    dispatch(setFilter(filter));
  };

  const clearCompletedHandler = () => {
    dispatch(clearCompletedTodos());
  };

  return (
    <>
      <div className={`header ${!darkMode ? 'whiteBg' : ''}`}></div>
      <div className={styles.todos}>
        <div className={styles.todosHeader}>
          <h1>TODOS</h1>
          {darkMode ? (
            <img
              src={sunIcon}
              alt=""
              onClick={() => dispatch(toggleTheme())}
            />
          ) : (
            <img
              src={moonIcon}
              alt=""
              onClick={() => dispatch(toggleTheme())}
            />
          )}
        </div>

        <div className={styles.inputContainer}>
          <div className={styles.circle}></div>
          <form onSubmit={submitTodo}>
            <input
              type="text"
              ref={inputRef}
              placeholder="Create a new todo..."
              className={!darkMode ? styles.whiteBg : ''}
            />
            <button type="submit" hidden></button>
          </form>
        </div>

        <div
          className={`${styles.todosContainer} ${
            !darkMode ? styles.whiteBg : ''
          }`}
        >
          {todosToRender.map((todo) => (
            <Todo
              content={todo.content}
              key={todo.id}
              id={todo.id}
              completed={todo.completed}
            />
          ))}
          <div
            className={`${styles.todosFooter} ${
              !darkMode ? styles.whiteBg : ''
            }`}
          >
            <p>{activeTodosNumber} items left</p>
            <div className={styles.types}>
              <div className={styles.types}>
                <p
                  className={`${styles.clear} ${
                    filter === 'all' ? styles.active : ''
                  }`}
                  onClick={() => setFilterHandler('all')}
                >
                  All
                </p>
                <p
                  className={`${styles.clear} ${
                    filter === 'active' ? styles.active : ''
                  }`}
                  onClick={() => setFilterHandler('active')}
                >
                  Active
                </p>
                <p
                  className={`${styles.clear} ${
                    filter === 'completed' ? styles.active : ''
                  }`}
                  onClick={() => setFilterHandler('completed')}
                >
                  Completed
                </p>
              </div>
            </div>
            <p className={styles.clear} onClick={clearCompletedHandler}>
              Clear completed
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todos;

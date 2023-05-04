import React from 'react';
import crossIcon from '../images/icon-cross.svg';
import checkIcon from '../images/icon-check.svg';
import styles from './Todo.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../store/slices/themeSlice';
import {
  completeTodo,
  deleteTodo,
  updateTodo,
} from '../store/slices/todosSlice';
import { useState } from 'react';

function Todo({ content, completed, id }) {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const completeTodoHandler = () => {
    dispatch(completeTodo(id));
  };

  const deleteTodoHandler = () => {
    dispatch(deleteTodo(id));
  };

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const toggleEditMode = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  const handleBlur = () => {
    dispatch(updateTodo({ id, content: editedContent }));
    setEditing(false);
    setShowDeleteIcon(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const handleTouchStart = () => {
    if (editing) {
      setShowDeleteIcon(true);
    }
  };

  const handleTouchEnd = () => {
    if (!editing) {
      setShowDeleteIcon(false);
    }
  };

  return (
    <div
      className={styles.todoContainer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`${styles.circle} ${completed ? styles.active : ''}`}
        onClick={completeTodoHandler}
      >
        <img src={checkIcon} alt="" />
      </div>
      {editing ? (
        <input
          type="text"
          value={editedContent}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          className={`${styles.todo} ${styles.editTodo} ${
            !darkMode ? styles.whiteBg : ''
          } ${completed ? styles.active : ''}`}
          autoFocus
        />
      ) : (
        <li
          className={`${styles.todo}  ${!darkMode ? styles.whiteBg : ''} ${
            completed ? styles.active : ''
          }`}
          onClick={toggleEditMode}
        >
          <span className={styles.todoText}>{content}</span>
        </li>
      )}

      <img
        src={crossIcon}
        className={`${styles.deleteIcon} ${
          showDeleteIcon || editing ? styles.show : ''
        }`}
        onClick={deleteTodoHandler}
      />
    </div>
  );
}

export default Todo;

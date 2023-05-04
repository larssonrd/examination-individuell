import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StartPage.module.scss';

function StartPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/todos');
  };

  return (
    <div className={styles.startContainer}>
      <h1>Welcome to TODOS!</h1>
      <button onClick={handleClick} className={styles.startBtn}>
        See your todos →
      </button>
    </div>
  );
}

export default StartPage;

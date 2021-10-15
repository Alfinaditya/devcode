import React from 'react';
import styles from './detail[id].module.css';
import { DetailTodo } from '../../api/todos';
import { useParams, useHistory } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();
  const todo = DetailTodo(id);
  return (
    <div className={styles.card}>
      <span onClick={() => history.push('/')}>Back</span>
      <h1>{todo.title}</h1>
    </div>
  );
};

export default Detail;

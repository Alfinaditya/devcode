import React, { useState } from 'react';
import styles from './detail[id].module.css';
import { DetailTodo, UpdateTodoTitle } from '../../api/todos';
import { useParams, useHistory } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: todo, watchTitleField, setWatchTitleField } = DetailTodo(id);
  function handleUpdateTodoTitle(e, params) {
    e.preventDefault();
    UpdateTodoTitle(params, watchTitleField);
  }

  return (
    <div className={styles.card}>
      <span onClick={() => history.push('/')}>Back</span>
      <h1>{watchTitleField}</h1>
      <form onSubmit={e => handleUpdateTodoTitle(e, todo.id)}>
        <input
          type="text"
          value={watchTitleField}
          onChange={e => setWatchTitleField(e.target.value)}
        />
        <button type="submit">Submit shit</button>
      </form>
    </div>
  );
};

export default Detail;

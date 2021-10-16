import React, { useState } from 'react';
import styles from './detail[id].module.css';
import {
  CreateTodoItems,
  DetailTodo,
  UpdateTodoTitle,
  RefetchTodoItems,
  RemoveTodoItems,
} from '../../api/todos';
import { useParams, useHistory } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data: todo, watchTitleField, setWatchTitleField } = DetailTodo(id);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [todoDetailsRefetch, setTodoDetailsRefetch] = useState('');

  function handleUpdateTodoTitle(e) {
    e.preventDefault();
    UpdateTodoTitle(todo.id, watchTitleField);
  }

  function handleAdd(e) {
    e.preventDefault();
    const body = JSON.stringify({
      title,
      priority,
      activity_group_id: todo.id,
    });
    CreateTodoItems(body).then(() => {
      RefetchTodoItems(todo.id).then(refetchRes => {
        console.log(refetchRes);
        setTodoDetailsRefetch(refetchRes.data);
      });
    });
  }

  function handleDelete(e, params) {
    e.preventDefault();
    RemoveTodoItems(params).then(() => {
      RefetchTodoItems(todo.id).then(refetchRes => {
        setTodoDetailsRefetch(refetchRes.data);
      });
    });
  }

  return (
    <div className={styles.card}>
      <span onClick={() => history.push('/')}>Back</span>
      <h1>{watchTitleField}</h1>

      <form onSubmit={e => handleUpdateTodoTitle(e)}>
        <input
          type="text"
          value={watchTitleField}
          onChange={e => setWatchTitleField(e.target.value)}
        />
        <button type="submit">Submit shit</button>
      </form>
      <button>Tambah</button>

      <form onSubmit={e => handleAdd(e)}>
        <label>Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
        />
        <label>Priority</label>
        <input
          type="text"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        />
        <button disabled={(!title, !priority)}>Submit</button>
      </form>

      {todoDetailsRefetch
        ? todoDetailsRefetch.map(todoItem => (
            <div key={todoItem.id}>
              <p>{todoItem.priority}</p>
              <p>{todoItem.title}</p>
              <p onClick={e => handleDelete(e, todoItem.id)}>DELETE</p>
            </div>
          ))
        : todo &&
          todo.todo_items &&
          todo.todo_items.map(todoItem => (
            <div key={todoItem.id}>
              <p>{todoItem.priority}</p>
              <p>{todoItem.title}</p>
              <p onClick={e => handleDelete(e, todoItem.id)}>DELETE</p>
            </div>
          ))}
    </div>
  );
};

export default Detail;

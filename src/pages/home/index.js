import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { GetTodos, CreateTodo, Refetch, RemoveTodo } from '../../api/todos';
import styles from './home.module.css';
import { convertDate } from '../../helpers/';

const Home = () => {
  const history = useHistory();
  const todos = GetTodos();
  const [todosRefetch, SetTodosRefetch] = useState('');

  function handleAdd() {
    CreateTodo().then(() => {
      Refetch().then(refetchRes => {
        SetTodosRefetch(refetchRes.data);
      });
    });
  }
  function handleDelete(params) {
    RemoveTodo(params).then(() => {
      Refetch().then(refetchRes => {
        SetTodosRefetch(refetchRes.data);
      });
    });
  }
  console.log('refetch todos ' + todosRefetch.length);
  console.log('todos ' + todos.length);
  return (
    <div>
      <h1>Activity</h1>
      <button onClick={handleAdd}>+ Tambah</button>
      {todosRefetch
        ? todosRefetch.map(todo => {
            const { date, month, years } = convertDate(todo.created_at);
            return (
              <div key={todo.id} className={styles.card}>
                <h1 onClick={() => history.push(`/detail/${todo.id}`)}>
                  {todo.title}
                </h1>
                <p>
                  {date} {month} {years}
                </p>
                <p onClick={() => handleDelete(todo.id)}>DELETE</p>
              </div>
            );
          })
        : todos &&
          todos.map(todo => {
            const { date, month, years } = convertDate(todo.created_at);
            return (
              <div key={todo.id} className={styles.card}>
                <h1 onClick={() => history.push(`/detail/${todo.id}`)}>
                  {todo.title}
                </h1>
                <p>
                  {date} {month} {years}
                </p>
                <p onClick={() => handleDelete(todo.id)}>DELETE</p>
              </div>
            );
          })}
      {!todos.length && !todosRefetch.length && <p>No Activity</p>}
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { GetTodos, CreateTodo, Refetch, RemoveTodo } from '../../api/todos';
import styles from './home.module.css';
import { convertDate } from '../../helpers/';
import Loading from '../../components/loading/Loading';

const Home = () => {
  const history = useHistory();
  const {
    data: todos,
    setData: setTodos,
    isLoading,
    setIsLoading,
  } = GetTodos();
  const [initConfirmModal, setInitConfirmModal] = useState(false);
  const [params, setParams] = useState('');

  function handleAdd() {
    setIsLoading(true);
    CreateTodo().then(() => {
      Refetch().then(refetchRes => {
        setTodos(refetchRes.data);
        setIsLoading(false);
      });
    });
  }

  function handleDelete() {
    setIsLoading(true);
    RemoveTodo(params).then(() => {
      Refetch().then(refetchRes => {
        setTodos(refetchRes.data);
        setInitConfirmModal(false);
        setIsLoading(false);
      });
    });
  }

  return (
    <div>
      <h1>Activity</h1>
      <button onClick={handleAdd}>+ Tambah</button>
      {initConfirmModal && (
        <>
          <button onClick={() => setInitConfirmModal(false)}>No</button>
          <button
            onClick={() => {
              handleDelete();
            }}
          >
            yes
          </button>
        </>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        todos &&
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
              <p
                onClick={() => {
                  setInitConfirmModal(true);
                  setParams(todo.id);
                }}
              >
                DELETE
              </p>
            </div>
          );
        })
      )}

      {!todos.length && <p>No Activity</p>}
    </div>
  );
};

export default Home;

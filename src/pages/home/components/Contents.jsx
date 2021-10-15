import React from 'react';
import { GetTodos } from '../../../api/todos';
import { convertDate } from '../../../helpers';
import { useHistory } from 'react-router-dom';
import styles from '../home.module.css';

const Contents = () => {
  const history = useHistory();
  const todos = GetTodos();
  return (
    <div>
      {todos &&
        todos.map(todo => {
          const { date, month, years } = convertDate(todo.created_at);
          return (
            <div
              onClick={() => history.push(`/detail/${todo.id}`)}
              key={todo.id}
              className={styles.card}
            >
              <h1>{todo.title}</h1>
              <p>
                {date} {month} {years}
              </p>
            </div>
          );
        })}
    </div>
  );
};
export default Contents;

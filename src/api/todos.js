import { useEffect, useState } from 'react';

export const GetTodos = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch('https://todo.api.devcode.gethired.id/activity-groups', {
      method: 'GET',
    })
      .then(x => {
        return x.json();
      })
      .then(res => {
        setData(res.data);
      });
  }, []);
  return data;
};

export const CreateTodo = () => {
  return fetch(`https://todo.api.devcode.gethired.id/activity-groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'New Activity',
    }),
  }).then(x => {
    console.log(x);
    return x.json();
  });
};

export const DetailTodo = params => {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch(`https://todo.api.devcode.gethired.id/activity-groups/${params}`, {
      method: 'GET',
    })
      .then(x => {
        return x.json();
      })
      .then(res => {
        setData(res);
      });
  }, []);
  return data;
};

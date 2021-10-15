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

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
    return x.json();
  });
};

export const DetailTodo = params => {
  const [data, setData] = useState('');
  const [watchTitleField, setWatchTitleField] = useState('');
  useEffect(() => {
    fetch(`https://todo.api.devcode.gethired.id/activity-groups/${params}`, {
      method: 'GET',
    })
      .then(x => {
        return x.json();
      })
      .then(res => {
        setData(res);
        setWatchTitleField(res.title);
      });
  }, []);
  return { data, watchTitleField, setWatchTitleField };
};

export const RemoveTodo = params => {
  return fetch(
    `https://todo.api.devcode.gethired.id/activity-groups/${params}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(x => {
    return x.json();
  });
};

export const UpdateTodoTitle = (params, value) => {
  return fetch(
    `https://todo.api.devcode.gethired.id/activity-groups/${params}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: value,
      }),
    }
  ).then(x => {
    return x.json();
  });
};

export const Refetch = () => {
  return fetch('https://todo.api.devcode.gethired.id/activity-groups', {
    method: 'GET',
  }).then(x => {
    return x.json();
  });
};

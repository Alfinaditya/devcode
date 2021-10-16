import { useEffect, useState } from 'react';

export const GetTodos = () => {
  const [data, setData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://todo.api.devcode.gethired.id/activity-groups', {
      method: 'GET',
    })
      .then(x => {
        return x.json();
      })
      .then(res => {
        setData(res.data);
        setIsLoading(false);
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, []);
  return { data, setData, isLoading, setIsLoading, isError, setIsError };
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

export const CreateTodoItems = body => {
  return fetch('https://todo.api.devcode.gethired.id/todo-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then(x => {
    console.log(x);
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

export const RemoveTodoItems = params => {
  return fetch(`https://todo.api.devcode.gethired.id/todo-items/${params}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(x => {
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

export const RefetchTodoItems = params => {
  return fetch(
    `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${params}`,
    {
      method: 'GET',
    }
  ).then(x => {
    return x.json();
  });
};

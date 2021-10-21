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
	console.log(body);
	return fetch('https://todo.api.devcode.gethired.id/todo-items', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	}).then(x => {
		return x.json();
	});
};
export const DetailTodo = params => {
	const [watchTitleField, setWatchTitleField] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState('');
	useEffect(() => {
		setIsLoading(true);
		fetch(`https://todo.api.devcode.gethired.id/activity-groups/${params}`, {
			method: 'GET',
		})
			.then(x => {
				return x.json();
			})
			.then(res => {
				setData(res);
				setWatchTitleField(res.title);
				setIsLoading(false);
				setIsError(false);
			})
			.catch(() => {
				setIsError(true);
			});
	}, []);
	return {
		data,
		setData,
		watchTitleField,
		setWatchTitleField,
		isLoading,
		isError,
		setIsLoading,
	};
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
// export const GetTodoItem = params => {
// 	return fetch(``, {
// 		method: 'GET',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 	}).then(x => {
// 		return x.json();
// 	});
// };
export const GetTodoItem = params => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState('');
	useEffect(() => {
		setIsLoading(true);
		fetch(`https://todo.api.devcode.gethired.id/todo-items/${params}`, {
			method: 'GET',
		})
			.then(x => {
				return x.json();
			})
			.then(res => {
				setData(res);
				setIsLoading(false);
				setIsError(false);
			})
			.catch(() => {
				setIsError(true);
			});
	}, []);
	return {
		data,
		setData,
		isLoading,
		isError,
		setIsLoading,
	};
};
export const UpdateTodoItem = (params, body) => {
	return fetch(`https://todo.api.devcode.gethired.id/todo-items/${params}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
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

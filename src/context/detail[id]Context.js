import { useState, createContext, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PRIORITY_CONDITIONS } from '../pages/detail[id]/text';
import {
	DetailTodo,
	CreateTodoItems,
	RemoveTodoItems,
	RefetchTodoItems,
} from '../api/todos';

export const DetailContext = createContext(null);
export const DetailContextProvider = ({ children }) => {
	const { id } = useParams();
	const {
		data: todo,
		watchTitleField,
		setWatchTitleField,
		isLoading,
		setIsLoading,
	} = DetailTodo(id);
	const [title, setTitle] = useState('');
	const [priorityValue, setPriorityValue] = useState(
		PRIORITY_CONDITIONS[0].value
	);
	const [refetchTodoItems, setRefetchTodoItems] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [params, setParams] = useState('');
	const [sort, setSort] = useState('Ascending');
	const [showAddTodoItemModal, setShowAddTodoItemModal] = useState(false);

	function handleAdd(e) {
		e.preventDefault();
		setIsLoading(true);
		const body = JSON.stringify({
			title,
			priority: priorityValue,
			activity_group_id: todo.id,
		});
		console.log(body);
		CreateTodoItems(body).then(() => {
			RefetchTodoItems(todo.id).then(refetchRes => {
				console.log(refetchRes);
				setRefetchTodoItems(refetchRes.data);
				setIsLoading(false);
			});
		});
	}
	function handleDelete() {
		setIsLoading(true);
		RemoveTodoItems(params).then(() => {
			RefetchTodoItems(todo.id).then(refetchRes => {
				setRefetchTodoItems(refetchRes.data);
				setShowConfirmModal(false);
				setIsLoading(false);
			});
		});
	}
	const titleMemoized = useMemo(() => ({ title, setTitle }), [title, setTitle]);

	const todoMemoized = useMemo(() => ({ todo }), [todo]);

	const priorityValueMemoized = useMemo(
		() => ({ priorityValue, setPriorityValue }),
		[priorityValue, setPriorityValue]
	);

	const isLoadingMemoized = useMemo(
		() => ({ isLoading, setIsLoading }),
		[isLoading, setIsLoading]
	);

	const watchTitleFieldMemoized = useMemo(
		() => ({ watchTitleField, setWatchTitleField }),
		[watchTitleField, setWatchTitleField]
	);

	const refetchTodoItemsMemoized = useMemo(
		() => ({ refetchTodoItems, setRefetchTodoItems }),
		[refetchTodoItems, setRefetchTodoItems]
	);

	const showConfirmModalMemoized = useMemo(
		() => ({ showConfirmModal, setShowConfirmModal }),
		[showConfirmModal, setShowConfirmModal]
	);

	const sortMemoized = useMemo(() => ({ sort, setSort }), [sort, setSort]);
	const paramsMemoized = useMemo(
		() => ({ params, setParams }),
		[params, setParams]
	);

	const showAddTodoItemModalMemoized = useMemo(
		() => ({ showAddTodoItemModal, setShowAddTodoItemModal }),
		[showAddTodoItemModal, setShowAddTodoItemModal]
	);

	return (
		<DetailContext.Provider
			value={{
				titleMemoized,
				isLoadingMemoized,
				sortMemoized,
				paramsMemoized,
				showAddTodoItemModalMemoized,
				handleAdd,
				handleDelete,
				showConfirmModalMemoized,
				todoMemoized,
				refetchTodoItems,
				refetchTodoItemsMemoized,
				watchTitleFieldMemoized,
				priorityValueMemoized,
			}}
		>
			{children}
		</DetailContext.Provider>
	);
};

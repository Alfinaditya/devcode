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
	const [currentpriorityValue, setCurrentPriorityValue] = useState(
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
			currentpriorityValue,
			activity_group_id: todo.id,
		});
		CreateTodoItems(body).then(() => {
			RefetchTodoItems(todo.id).then(refetchRes => {
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
	const handleAddMemoized = useMemo(
		() => ({ handleAdd, handleDelete }),
		[handleAdd, handleDelete]
	);
	const handleDeleteMemoized = useMemo(
		() => ({ params, setParams }),
		[params, setParams]
	);
	return (
		<DetailContext.Provider
			value={{
				titleMemoized,
				isLoadingMemoized,
				sortMemoized,
				paramsMemoized,
				showAddTodoItemModalMemoized,
				handleAddMemoized,
				handleDeleteMemoized,
				showConfirmModalMemoized,
				todoMemoized,
				refetchTodoItems,
				refetchTodoItemsMemoized,
				watchTitleFieldMemoized,
			}}
		>
			{children}
		</DetailContext.Provider>
	);
};

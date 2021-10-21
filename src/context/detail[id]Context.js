import { useState, createContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
	DetailTodo,
	RemoveTodoItems,
	RefetchTodoItems,
	UpdateTodoItem,
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
	const [refetchTodoItems, setRefetchTodoItems] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [params, setParams] = useState('');
	const [sort, setSort] = useState('Ascending');

	// function handleUpdateTodoItem() {
	// 	setIsLoading(true);
	// 	UpdateTodoItem(params).then(() => {
	// 		RefetchTodoItems(todo.id).then(refetchRes => {
	// 			setRefetchTodoItems(refetchRes.data);
	// 			setShowConfirmModal(false);
	// 			setIsLoading(false);
	// 		});
	// 	});
	// }

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

	return (
		<DetailContext.Provider
			value={{
				isLoadingMemoized,
				sortMemoized,
				paramsMemoized,
				showConfirmModalMemoized,
				todoMemoized,
				refetchTodoItemsMemoized,
				watchTitleFieldMemoized,
			}}
		>
			{children}
		</DetailContext.Provider>
	);
};

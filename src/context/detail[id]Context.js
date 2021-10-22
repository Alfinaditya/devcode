import { useState, createContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DetailTodo } from '../api/todos';

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
	const [refetchTodoItems, setRefetchTodoItems] = useState('');
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [sort, setSort] = useState('Ascending');

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

	return (
		<DetailContext.Provider
			value={{
				isLoadingMemoized,
				sortMemoized,
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

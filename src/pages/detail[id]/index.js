import React from 'react';
import { DetailContextProvider } from '../../context/detail[id]Context';
import Header from './Header';
import TodoItems from './TodoItems';
import styles from './detail.module.css';
import AddTodoItemModal from './components/AddTodoItemModal';
import EditTodoItemModal from './components/EditTodoItemModal';
const Detail = () => {
	return (
		<DetailContextProvider>
			<div className={styles.detail}>
				<Header />
				<TodoItems />
				<AddTodoItemModal />
				<EditTodoItemModal />
			</div>
		</DetailContextProvider>
	);
};

export default Detail;

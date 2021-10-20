import React, { useContext, useState } from 'react';
import Loading from '../../components/loading/Loading';
import todoItemsEmpty from '../../assets/todoItemsEmpty.svg';
import styles from './detail.module.css';
import { DetailContext } from '../../context/detail[id]Context';

const TodoItems = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const ctx = useContext(DetailContext);
	return (
		<div>
			{ctx.todoMemoized.todo &&
				!ctx.todoMemoized.todo.todo_items.length &&
				!ctx.todoMemoized.refetchTodoItems && (
					<img
						className={styles.todoItemsEmptyIcon}
						src={todoItemsEmpty}
						alt='Empty todo items'
						onClick={() =>
							ctx.showAddTodoItemModalMemoized.setShowAddTodoItemModal(true)
						}
					/>
				)}
			{ctx.isLoading ? (
				<Loading />
			) : !ctx.refetchTodoItemsMemoized.refetchTodoItems ? (
				ctx.todoMemoized.todo &&
				ctx.todoMemoized.todo.todo_items
					.sort((a, b) => {
						switch (ctx.sortMemoized.sort) {
							case 'Ascending':
								if (a.id > b.id) {
									return -1;
								}
								if (a.id < b.id) {
									return 1;
								}
								break;
							case 'A-Z':
								if (a.title < b.title) {
									return -1;
								}
								if (a.title > b.title) {
									return 1;
								}
								break;
							case 'Z-A':
								if (a.title > b.title) {
									return -1;
								}
								if (a.title < b.title) {
									return 1;
								}
								break;
							case 'Descending':
								if (a.id < b.id) {
									return -1;
								}
								if (a.id > b.id) {
									return 1;
								}
								break;
							default:
								break;
						}
					})
					.filter(a => {
						if (ctx.sortMemoized.sort === 'notCompleted') {
							return a.is_active === 1;
						} else {
							return a;
						}
					})
					.map(todoItem => {
						return (
							<div key={todoItem.id}>
								<p>{todoItem.priority}</p>
								<p>{todoItem.title}</p>
								<p
									onClick={e => {
										setShowConfirmModal(true);
										ctx.paramsMemoized.setParams(todoItem.id);
									}}
								>
									DELETE
								</p>
							</div>
						);
					})
			) : (
				ctx.refetchTodoItemsMemoized.refetchTodoItems &&
				ctx.refetchTodoItemsMemoized.refetchTodoItems
					.sort((a, b) => {
						switch (ctx.sortMemoized.sort) {
							case 'Ascending':
								if (a.id > b.id) {
									return -1;
								}
								if (a.id < b.id) {
									return 1;
								}
								break;
							case 'A-Z':
								if (a.title < b.title) {
									return -1;
								}
								if (a.title > b.title) {
									return 1;
								}
								break;
							case 'Z-A':
								if (a.title > b.title) {
									return -1;
								}
								if (a.title < b.title) {
									return 1;
								}
								break;
							case 'Descending':
								if (a.id < b.id) {
									return -1;
								}
								if (a.id > b.id) {
									return 1;
								}
								break;
							default:
								break;
						}
					})
					.filter(a => {
						if (ctx.sortMemoized.sort === 'notCompleted') {
							return a.is_active === 1;
						} else {
							return a;
						}
					})
					.map(todoItem => {
						return (
							<div key={todoItem.id}>
								<p>{todoItem.priority}</p>
								<p>{todoItem.title}</p>
								<p
									onClick={e => {
										setShowConfirmModal(true);
										ctx.paramsMemoized.setParams(todoItem.id);
									}}
								>
									DELETE
								</p>
							</div>
						);
					})
			)}
		</div>
	);
};

export default TodoItems;

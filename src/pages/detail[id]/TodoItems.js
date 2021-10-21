import React, { useContext, useState } from 'react';
import Loading from '../../components/loading/Loading';
import todoItemsEmpty from '../../assets/todoItemsEmpty.svg';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import styles from './detail.module.css';
import { DetailContext } from '../../context/detail[id]Context';
import ConfirmModal from '../../components/confirmModal';
import EditTodoItemModal from './components/EditTodoItemModal';
import { renderPriorityColor } from '../../helpers';
import { RemoveTodoItems, RefetchTodoItems } from '../../api/todos';

const TodoItems = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [confirmModalText, setConfirmModalText] = useState('');
	const [open, setOpen] = useState(false);
	const ctx = useContext(DetailContext);

	function handleDelete() {
		ctx.isLoadingMemoized.setIsLoading(true);
		RemoveTodoItems(ctx.paramsMemoized.params).then(() => {
			RefetchTodoItems(ctx.todoMemoized.todo.id).then(refetchRes => {
				ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
				setShowConfirmModal(false);
				ctx.isLoadingMemoized.setIsLoading(false);
			});
		});
	}

	return (
		<div>
			{ctx.todoMemoized.todo &&
				!ctx.todoMemoized.todo.todo_items.length &&
				!ctx.refetchTodoItemsMemoized.refetchTodoItems && (
					<img
						className={styles.todoItemsEmptyIcon}
						src={todoItemsEmpty}
						alt='Empty todo items'
					/>
				)}
			<ConfirmModal
				open={showConfirmModal}
				setOpen={setShowConfirmModal}
				title={confirmModalText}
				handleDelete={handleDelete}
			/>
			{ctx.isLoadingMemoized.isLoading ? (
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
							<div className={styles.todoItem} key={todoItem.id}>
								<div>
									<input type='checkbox' />
									<div
										className={styles.todoItemEclipse}
										style={{
											background: renderPriorityColor(todoItem.priority),
										}}
									></div>
									<p>{todoItem.title}</p>
									<img
										onClick={() => {
											setOpen(true);
										}}
										src={pencil}
										alt='edit'
									/>
								</div>
								<img
									onClick={() => {
										setShowConfirmModal(true);
										setConfirmModalText(todoItem.title);
										ctx.paramsMemoized.setParams(todoItem.id);
									}}
									src={trash}
									alt='Delete'
								/>
								<EditTodoItemModal
									id={todoItem.id}
									title={todoItem.title}
									priority={todoItem.priority}
									open={open}
									setOpen={setOpen}
								/>
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
							<div className={styles.todoItem} key={todoItem.id}>
								<div>
									<input type='checkbox' />
									<div
										className={styles.todoItemEclipse}
										style={{
											background: renderPriorityColor(todoItem.priority),
										}}
									></div>
									<p>{todoItem.title}</p>
									<img
										onClick={() => {
											setOpen(true);
										}}
										src={pencil}
										alt='edit'
									/>
								</div>
								<img
									onClick={() => {
										setShowConfirmModal(true);
										setConfirmModalText(todoItem.title);
										ctx.paramsMemoized.setParams(todoItem.id);
									}}
									src={trash}
									alt='Delete'
								/>
								<EditTodoItemModal
									id={todoItem.id}
									title={todoItem.title}
									priority={todoItem.priority}
									open={open}
									setOpen={setOpen}
								/>
							</div>
						);
					})
			)}
		</div>
	);
};

export default TodoItems;

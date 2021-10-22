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
import AddTodoItemModal from '../detail[id]/components/AddTodoItemModal';

const TodoItems = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [confirmModalText, setConfirmModalText] = useState('');
	const [showEditTodoItemModal, setShowEditTodoItemModal] = useState(false);
	const [showAddTodoItemModal, setShowAddTodoItemModal] = useState(false);
	const ctx = useContext(DetailContext);

	async function handleDelete() {
		ctx.isLoadingMemoized.setIsLoading(true);
		const response = await RemoveTodoItems(ctx.paramsMemoized.params);
		const refetchRes = await RefetchTodoItems(ctx.todoMemoized.todo.id);
		ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
		setShowConfirmModal(false);
		ctx.isLoadingMemoized.setIsLoading(false);
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
						onClick={() => setShowAddTodoItemModal(true)}
					/>
				)}
			<AddTodoItemModal
				open={showAddTodoItemModal}
				setOpen={setShowAddTodoItemModal}
			/>
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
											setShowEditTodoItemModal(true);
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
									currentTitle={todoItem.title}
									currentPriorityValue={todoItem.priority}
									open={showEditTodoItemModal}
									setOpen={setShowEditTodoItemModal}
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
											setShowEditTodoItemModal(true);
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
									currentTitle={todoItem.title}
									currentPriorityValue={todoItem.priority}
									open={showEditTodoItemModal}
									setOpen={setShowEditTodoItemModal}
								/>
							</div>
						);
					})
			)}
		</div>
	);
};

export default TodoItems;

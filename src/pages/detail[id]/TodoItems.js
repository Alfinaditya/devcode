import React, { useContext, useState } from 'react';
import Loading from '../../components/loading/Loading';
import todoItemsEmpty from '../../assets/todoItemsEmpty.svg';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import styles from './detail.module.css';
import { DetailContext } from '../../context/detail[id]Context';
import ConfirmModal from '../../components/confirmModal';

function sortFunction(sort, a, b) {
	switch (sort) {
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
}
function renderPriorityColor(priority) {
	let color;
	switch (priority) {
		case 'very-high':
			color = '#ED4C5C';
			break;

		case 'high':
			color = '#F8A541';
			break;
		case 'normal':
			color = '#00A790';
			break;

		case 'low':
			color = '#428BC1';
			break;

		case 'very-low':
			color = '#428BC1';
			break;

		default:
			break;
	}
	return color;
}
const TodoItems = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [confirmModalText, setConfirmModalText] = useState('');
	const ctx = useContext(DetailContext);
	return (
		<div>
			{ctx.todoMemoized.todo &&
				!ctx.todoMemoized.todo.todo_items.length &&
				!ctx.refetchTodoItemsMemoized.refetchTodoItems && (
					<img
						className={styles.todoItemsEmptyIcon}
						src={todoItemsEmpty}
						alt='Empty todo items'
						onClick={() =>
							ctx.showAddTodoItemModalMemoized.setShowAddTodoItemModal(true)
						}
					/>
				)}
			<ConfirmModal
				open={showConfirmModal}
				setOpen={setShowConfirmModal}
				title={confirmModalText}
				handleDelete={ctx.handleDelete}
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
											ctx.showEditTodoItemModalMemoized.setShowEditTodoItemModal(
												true
											);
											ctx.todoItemIdMemoized(todoItem.id);
										}}
										src={pencil}
										alt='edit'
									/>
								</div>
								<img
									onClick={e => {
										setShowConfirmModal(true);
										setConfirmModalText(todoItem.title);
										ctx.paramsMemoized.setParams(todoItem.id);
									}}
									src={trash}
									alt='Delete'
								/>
							</div>
						);
					})
			) : (
				ctx.refetchTodoItemsMemoized.refetchTodoItems &&
				ctx.refetchTodoItemsMemoized.refetchTodoItems
					.sort((a, b) => {
						sortFunction(ctx.sortMemoized.sort, a, b);
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
											ctx.showEditTodoItemModalMemoized.setShowEditTodoItemModal(
												true
											);
											ctx.todoItemIdMemoized.setTodoItem(todoItem.id);
										}}
										src={pencil}
										alt='edit'
									/>
								</div>
								<img
									onClick={e => {
										setShowConfirmModal(true);
										setConfirmModalText(todoItem.title);
										ctx.paramsMemoized.setParams(todoItem.id);
									}}
									src={trash}
									alt='Delete'
								/>
							</div>
						);
					})
			)}
		</div>
	);
};

export default TodoItems;

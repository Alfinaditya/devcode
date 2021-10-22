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
import {
	RemoveTodoItems,
	RefetchTodoItems,
	UpdateActiveTodoItem,
} from '../../api/todos';
import AddTodoItemModal from '../detail[id]/components/AddTodoItemModal';
function sort(sort, a, b) {
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
const TodoItems = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [confirmModalText, setConfirmModalText] = useState('');
	const [showEditTodoItemModal, setShowEditTodoItemModal] = useState(false);
	const [showAddTodoItemModal, setShowAddTodoItemModal] = useState(false);
	const ctx = useContext(DetailContext);

	async function handleDelete() {
		ctx.isLoadingMemoized.setIsLoading(true);
		const response = await RemoveTodoItems(ctx.todoMemoized.todo.id);
		const refetchRes = await RefetchTodoItems(ctx.todoMemoized.todo.id);
		ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
		setShowConfirmModal(false);
		ctx.isLoadingMemoized.setIsLoading(false);
	}
	async function handleActive(params, checkedValue) {
		const body = JSON.stringify({
			is_active: checkedValue ? 0 : 1,
		});
		const response = await UpdateActiveTodoItem(params, body);
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
						return sort(ctx.sortMemoized.sort, a, b);
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
									<input
										defaultChecked={todoItem.is_active === 0 ? true : false}
										onChange={e => {
											handleActive(todoItem.id, e.target.checked);
										}}
										type='checkbox'
									/>
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
						return sort(ctx.sortMemoized.sort, a, b);
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
									<input
										type='checkbox'
										defaultChecked={todoItem.is_active === 0 ? true : false}
										onChange={e => {
											handleActive(todoItem.id, e.target.checked);
										}}
									/>
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

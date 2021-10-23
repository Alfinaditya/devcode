import React, { useContext, useState } from 'react';
import Loading from '../../components/loading/Loading';
import todoItemsEmpty from '../../assets/todoItemsEmpty.svg';
import pencil from '../../assets/pencil.svg';
import trash from '../../assets/trash.svg';
import styles from './detail.module.css';
import { DetailContext } from '../../context/detail[id]Context';
import ConfirmModal from '../../components/confirmModal';
import { renderPriorityColor } from '../../helpers';
import {
	RemoveTodoItems,
	RefetchTodoItems,
	UpdateActiveTodoItem,
} from '../../api/todos';
import AddTodoItemModal from '../detail[id]/components/AddTodoItemModal';
import EditTodoItemModal from './components/EditTodoItemModal';
import { Transition } from 'react-transition-group';

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
	const [id, setId] = useState('');
	const [currentTitle, setCurrentTitle] = useState('');
	const [currentPriorityValue, setCurrentPriorityValue] = useState('');
	const ctx = useContext(DetailContext);

	async function handleDelete() {
		ctx.isLoadingMemoized.setIsLoading(true);
		await RemoveTodoItems(ctx.todoMemoized.todo.id);
		const refetchRes = await RefetchTodoItems(ctx.todoMemoized.todo.id);
		ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
		setShowConfirmModal(false);
		ctx.isLoadingMemoized.setIsLoading(false);
	}
	async function handleActive(params, checkedValue) {
		const body = JSON.stringify({
			is_active: checkedValue ? 0 : 1,
		});
		await UpdateActiveTodoItem(params, body);
	}
	return (
		<div>
			{ctx.todoMemoized.todo &&
				!ctx.todoMemoized.todo.todo_items.length &&
				!ctx.refetchTodoItemsMemoized.refetchTodoItems && (
					<img
						data-cy='todo-empty-state'
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
				things={'List Item'}
			/>
			<Transition
				in={showEditTodoItemModal}
				timeout={{
					exit: 400,
				}}
				unmountOnExit
			>
				{state => (
					<EditTodoItemModal
						id={id}
						currentTitle={currentTitle}
						currentPriorityValue={currentPriorityValue}
						setOpen={setShowEditTodoItemModal}
						transition={state}
					/>
				)}
			</Transition>
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
							<div
								data-cy='todo-item'
								className={styles.todoItem}
								key={todoItem.id}
							>
								<div>
									<input
										data-cy='todo-item-checkbox'
										defaultChecked={todoItem.is_active === 0 ? true : false}
										onChange={e => {
											handleActive(todoItem.id, e.target.checked);
										}}
										type='checkbox'
									/>
									<div
										data-cy='todo-item-priority-indicator'
										className={styles.todoItemEclipse}
										style={{
											background: renderPriorityColor(todoItem.priority),
										}}
									></div>
									<p data-cy='todo-item-title'>{todoItem.title}</p>
									<img
										data-cy='todo-item-edit-button'
										onClick={() => {
											setShowEditTodoItemModal(true);
											setId(todoItem.id);
											setCurrentPriorityValue(todoItem.priority);
											setCurrentTitle(todoItem.title);
											setId(todoItem.id);
										}}
										src={pencil}
										alt='edit'
									/>
								</div>
								<img
									data-cy='todo-item-delete-button'
									onClick={() => {
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
							<div
								datata-cy='todo-item'
								className={styles.todoItem}
								key={todoItem.id}
							>
								<div>
									<input
										data-cy='todo-item-checkbox'
										type='checkbox'
										defaultChecked={todoItem.is_active === 0 ? true : false}
										onChange={e => {
											handleActive(todoItem.id, e.target.checked);
										}}
									/>
									<div
										data-cy='todo-item-priority-indicator'
										className={styles.todoItemEclipse}
										style={{
											background: renderPriorityColor(todoItem.priority),
										}}
									></div>
									<p data-cy='todo-item-title'>{todoItem.title}</p>
									<img
										data-cy='todo-item-edit-button'
										onClick={() => {
											setShowEditTodoItemModal(true);
											setId(todoItem.id);
											setCurrentPriorityValue(todoItem.priority);
											setCurrentTitle(todoItem.title);
											setId(todoItem.id);
										}}
										src={pencil}
										alt='edit'
									/>
								</div>
								<img
									data-cy='todo-item-delete-button'
									onClick={() => {
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

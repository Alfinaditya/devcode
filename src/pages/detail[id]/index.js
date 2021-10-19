import React, { useState } from 'react';
import {
	CreateTodoItems,
	DetailTodo,
	UpdateTodoTitle,
	RefetchTodoItems,
	RemoveTodoItems,
} from '../../api/todos';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import plusSvg from '../../assets/plus.svg';
import pencil from '../../assets/pencil.svg';
import back from '../../assets/back.svg';
import todoItemsEmpty from '../../assets/todoItemsEmpty.svg';
import ascendingSort from '../../assets/ascendingSort.svg';
import descendingSort from '../../assets/descendingSort.svg';
import azSort from '../../assets/azSort.svg';
import zaSort from '../../assets/zaSort.svg';
import notCompletedSort from '../../assets/notCompletedSort.svg';
import sortButton from '../../assets/sortButton.svg';
import close from '../../assets/close.svg';
import styles from './detail.module.css';

const PRIORITY_CONDITIONS = [
	{
		id: 1,
		name: 'Very High',
		value: 'very-high',
	},
	{
		id: 2,
		name: 'High',
		value: 'high',
	},
	{
		id: 3,
		name: 'Medium',
		value: 'normal',
	},
	{
		id: 4,
		name: 'Low',
		value: 'low',
	},
	{
		id: 5,
		name: 'Very Low',
		value: 'very-low',
	},
];
const SORT_TYPES = [
	{ id: 1, type: 'Ascending', text: 'Terbaru', icon: ascendingSort },
	{ id: 2, type: 'Descending', text: 'Terlama', icon: descendingSort },
	{ id: 3, type: 'A-Z', text: 'A-Z', icon: azSort },
	{ id: 4, type: 'Z-A', text: 'Z-A', icon: zaSort },
	{
		id: 5,
		type: 'notCompleted',
		text: 'Belum Selesai',
		icon: notCompletedSort,
	},
];

const Detail = () => {
	const { id } = useParams();
	const history = useHistory();
	const {
		data: todo,
		watchTitleField,
		setWatchTitleField,
		isLoading,
		setIsLoading,
	} = DetailTodo(id);
	const [title, setTitle] = useState('');
	const [currentpriorityName, setCurrentPriorityName] = useState(
		PRIORITY_CONDITIONS[0].name
	);
	const [currentpriorityValue, setCurrentPriorityValue] = useState(
		PRIORITY_CONDITIONS[0].value
	);
	const [showPriorityOptions, setshowPriorityOptions] = useState(false);
	const [refetchTodoItems, setRefetchTodoItems] = useState(false);
	const [showAddTodoItemModal, setShowAddTodoItemModal] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showUpdateTitleForm, setshowUpdateTitleForm] = useState(false);
	const [params, setParams] = useState('');
	const [sort, setSort] = useState('Ascending');
	const [showDropdown, setShowDropdown] = useState(false);

	function handleUpdateTodoTitle(e) {
		e.preventDefault();
		UpdateTodoTitle(todo.id, watchTitleField);
	}
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
	return (
		<>
			{showConfirmModal && (
				<>
					<div>
						<button onClick={() => setShowConfirmModal(false)}>No</button>
						<button
							onClick={() => {
								handleDelete();
							}}
						>
							yes
						</button>
					</div>
					<div className={styles.modalOverlay}></div>
				</>
			)}
			<div className={styles.detail}>
				{/* header */}
				<div className={styles.header}>
					<div className={styles.titleContainer}>
						<img
							onClick={() => history.push('/')}
							src={back}
							alt='Back to Homepage'
							className={styles.back}
						/>
						{!showUpdateTitleForm && (
							<div className={styles.title}>
								<h1>{watchTitleField}</h1>
								<img
									src={pencil}
									onClick={() => setshowUpdateTitleForm(true)}
									alt='Submit'
									className={styles.updateTitleButton}
								/>
							</div>
						)}
						{showUpdateTitleForm && (
							<form onSubmit={e => handleUpdateTodoTitle(e)}>
								<input
									type='text'
									value={watchTitleField}
									onChange={e => setWatchTitleField(e.target.value)}
								/>
								<img
									src={pencil}
									onClick={() => setshowUpdateTitleForm(false)}
									alt='Submit'
									className={styles.updateTitleButton}
								/>
							</form>
						)}
					</div>

					{/* sort */}
					<div className={styles.right}>
						<div>
							<img
								onClick={() => setShowDropdown(!showDropdown)}
								src={sortButton}
								alt='Sort'
							/>
							{showDropdown && (
								<div className={styles.dropdown}>
									<div className={styles.dropdownItems}>
										{SORT_TYPES.map(SORT_TYPE => (
											<div
												key={SORT_TYPE.id}
												onClick={() => setSort(SORT_TYPE.type)}
												className={styles.dropdownItem}
											>
												<img src={SORT_TYPE.icon} alt={SORT_TYPE.text} />
												<span>{SORT_TYPE.text}</span>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<button
							className='addButton'
							onClick={() => setShowAddTodoItemModal(!showAddTodoItemModal)}
						>
							<img src={plusSvg} alt='Tambah' />
							<span className='addButtonText'>Tambah</span>
						</button>
					</div>
				</div>

				{/* Add Todo item*/}
				{showAddTodoItemModal && (
					<>
						<form className={styles.modalAdd} onSubmit={e => handleAdd(e)}>
							<div className={styles.modalAddHeader}>
								<h1>Tambah List item</h1>
								<img
									onClick={() => setShowAddTodoItemModal(false)}
									src={close}
									alt='Close'
								/>
							</div>
							<div className={styles.modalAddBody}>
								<label>NAMA LIST ITEM</label>
								<input
									value={title}
									onChange={e => setTitle(e.target.value)}
									type='text'
									placeholder='Tambahkan nama Activity'
								/>
								<label>PRIORITY</label>
								<div
									onClick={() => setshowPriorityOptions(!showPriorityOptions)}
								>
									{showPriorityOptions ? 'Pilih Priority' : currentpriorityName}
								</div>
								{showPriorityOptions &&
									PRIORITY_CONDITIONS.map(PRIORITY_CONDITION => (
										<div
											key={PRIORITY_CONDITION.id}
											id={PRIORITY_CONDITION.value}
											onClick={e => {
												setCurrentPriorityValue(e.currentTarget.id);
												setCurrentPriorityName(e.currentTarget.textContent);
												setshowPriorityOptions(false);
											}}
										>
											{PRIORITY_CONDITION.name}
										</div>
									))}
							</div>
							<button disabled={!title}>Submit</button>
						</form>
					</>
				)}

				{/* Todo Items Empty */}
				{todo && !todo.todo_items.length && !refetchTodoItems && (
					<img
						className={styles.todoItemsEmptyIcon}
						src={todoItemsEmpty}
						alt='Empty todo items'
						onClick={() => setShowAddTodoItemModal(true)}
					/>
				)}
				{isLoading ? (
					<Loading />
				) : !refetchTodoItems ? (
					todo &&
					todo.todo_items
						.sort((a, b) => {
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
						})
						.filter(a => {
							if (sort === 'notCompleted') {
								return a.is_active === 1;
							} else {
								return a;
							}
						})
						.map(todoItem => {
							console.log(todoItem);
							return (
								<div key={todoItem.id}>
									<p>{todoItem.priority}</p>
									<p>{todoItem.title}</p>
									<p
										onClick={e => {
											setShowConfirmModal(true);
											setParams(todoItem.id);
										}}
									>
										DELETE
									</p>
								</div>
							);
						})
				) : (
					refetchTodoItems &&
					refetchTodoItems
						.sort((a, b) => {
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
						})
						.filter(a => {
							if (sort === 'notCompleted') {
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
											setParams(todoItem.id);
										}}
									>
										DELETE
									</p>
								</div>
							);
						})
				)}
			</div>
		</>
	);
};

export default Detail;

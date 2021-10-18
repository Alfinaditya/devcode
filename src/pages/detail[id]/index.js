import React, { useState } from 'react';
import styles from './detail[id].module.css';
import {
	CreateTodoItems,
	DetailTodo,
	UpdateTodoTitle,
	RefetchTodoItems,
	RemoveTodoItems,
} from '../../api/todos';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

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
	const [refetchTodoItems, setRefetchTodoItems] = useState('');
	const [initConfirmModal, setInitConfirmModal] = useState(false);
	const [params, setParams] = useState('');

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
				setInitConfirmModal(false);
				setIsLoading(false);
			});
		});
	}

	return (
		<div className={styles.card}>
			<span onClick={() => history.push('/')}>Back</span>
			<h1>{watchTitleField}</h1>
			{initConfirmModal && (
				<>
					<button onClick={() => setInitConfirmModal(false)}>No</button>
					<button
						onClick={() => {
							handleDelete();
						}}
					>
						yes
					</button>
				</>
			)}
			<form onSubmit={e => handleUpdateTodoTitle(e)}>
				<input
					type='text'
					value={watchTitleField}
					onChange={e => setWatchTitleField(e.target.value)}
				/>
				<button type='submit'>Submit shit</button>
			</form>
			<button>Tambah</button>

			<form onSubmit={e => handleAdd(e)}>
				<label>Title</label>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					type='text'
				/>
				<label>Priority</label>
				<div onClick={() => setshowPriorityOptions(!showPriorityOptions)}>
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
				<button disabled={!title}>Submit</button>
			</form>

			{todo && !todo.todo_items.length && !refetchTodoItems && (
				<p>Buat List item kamu !</p>
			)}
			{isLoading ? (
				<Loading />
			) : !refetchTodoItems ? (
				todo &&
				todo.todo_items.map(todoItem => (
					<div key={todoItem.id}>
						<p>{todoItem.priority}</p>
						<p>{todoItem.title}</p>
						<p
							onClick={e => {
								setInitConfirmModal(true);
								setParams(todoItem.id);
							}}
						>
							DELETE
						</p>
					</div>
				))
			) : (
				refetchTodoItems &&
				refetchTodoItems.map(todoItem => (
					<div key={todoItem.id}>
						<p>{todoItem.priority}</p>
						<p>{todoItem.title}</p>
						<p
							onClick={e => {
								setInitConfirmModal(true);
								setParams(todoItem.id);
							}}
						>
							DELETE
						</p>
					</div>
				))
			)}
		</div>
	);
};

export default Detail;

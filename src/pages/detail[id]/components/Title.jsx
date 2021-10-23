import React, { useContext, useState } from 'react';
import styles from '../detail.module.css';
import pencil from '../../../assets/pencil.svg';
import back from '../../../assets/back.svg';
import { useHistory } from 'react-router-dom';
import { UpdateTodoTitle } from '../../../api/todos';
import { DetailContext } from '../../../context/detail[id]Context';

const Title = () => {
	const history = useHistory();
	const ctx = useContext(DetailContext);
	const [showUpdateTitleForm, setshowUpdateTitleForm] = useState(false);
	function handleUpdateTodoTitle() {
		UpdateTodoTitle(
			ctx.todoMemoized.todo.id,
			ctx.watchTitleFieldMemoized.watchTitleField
		);
	}
	return (
		<div className={styles.titleContainer}>
			<img
				onClick={() => history.push('/')}
				src={back}
				alt='Back to Homepage'
				className={styles.back}
				data-cy='todo-back-button'
			/>

			{!showUpdateTitleForm && (
				<div className={styles.title}>
					<h1 data-cy='todo-title'>
						{ctx.watchTitleFieldMemoized.watchTitleField}
					</h1>
					<img
						data-cy='todo-title-edit-button'
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
						value={ctx.watchTitleFieldMemoized.watchTitleField}
						onChange={e =>
							ctx.watchTitleFieldMemoized.setWatchTitleField(e.target.value)
						}
					/>
					<img
						src={pencil}
						onClick={() => {
							handleUpdateTodoTitle();
							setshowUpdateTitleForm(false);
						}}
						alt='Submit'
						className={styles.updateTitleButton}
					/>
				</form>
			)}
		</div>
	);
};

export default Title;

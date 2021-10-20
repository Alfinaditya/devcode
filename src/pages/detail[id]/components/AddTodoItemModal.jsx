import React, { useContext, useState } from 'react';
import { DetailContext } from '../../../context/detail[id]Context';
import styles from '../detail.module.css';
import { PRIORITY_CONDITIONS } from '../text';
import close from '../../../assets/close.svg';

const AddTodoItemModal = () => {
	const ctx = useContext(DetailContext);
	const [showPriorityOptions, setshowPriorityOptions] = useState(false);
	const [currentpriorityName, setCurrentPriorityName] = useState(
		PRIORITY_CONDITIONS[0].name
	);
	const [currentpriorityValue, setCurrentPriorityValue] = useState(
		PRIORITY_CONDITIONS[0].value
	);
	console.log();
	return (
		<>
			{ctx.showAddTodoItemModalMemoized.showAddTodoItemModal && (
				<>
					<form
						className={styles.modalAdd}
						onSubmit={e => ctx.handleAddMemoized.handleAdd(e)}
					>
						<div className={styles.modalAddHeader}>
							<h1>Tambah List item</h1>
							<img
								onClick={() =>
									ctx.showAddTodoItemModalMemoized.setShowAddTodoItemModal(
										false
									)
								}
								src={close}
								alt='Close'
							/>
						</div>
						<div className={styles.modalAddBody}>
							<label>NAMA LIST ITEM</label>
							<input
								value={ctx.titleMemoized.title}
								onChange={e => ctx.titleMemoized.setTitle(e.target.value)}
								type='text'
								placeholder='Tambahkan nama Activity'
							/>
							<label>PRIORITY</label>
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
						</div>
						<button disabled={!ctx.titleMemoized.title}>Submit</button>
					</form>
				</>
			)}
		</>
	);
};

export default AddTodoItemModal;

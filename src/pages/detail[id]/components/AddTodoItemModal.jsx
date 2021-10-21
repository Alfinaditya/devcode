import React, { useContext, useState } from 'react';
import { DetailContext } from '../../../context/detail[id]Context';
import styles from '../detail.module.css';
import close from '../../../assets/close.svg';
import check from '../../../assets/check.svg';
import dropdownArrow from '../../../assets/dropdownArrow.svg';
import { PRIORITY_CONDITIONS } from '../text';
import { CreateTodoItems, RefetchTodoItems } from '../../../api/todos';

const AddTodoItemModal = ({ open, setOpen }) => {
	const ctx = useContext(DetailContext);
	const [showPriorityOptions, setshowPriorityOptions] = useState(false);
	const [title, setTitle] = useState('');
	const [currentpriorityName, setCurrentPriorityName] = useState(
		PRIORITY_CONDITIONS[0].name
	);
	const [currentPriorityColor, setcurrentPriorityColor] = useState(
		PRIORITY_CONDITIONS[0].priorityColor
	);
	const [priorityValue, setPriorityValue] = useState(
		PRIORITY_CONDITIONS[0].value
	);
	function handleAdd() {
		ctx.isLoadingMemoized.setIsLoading(true);
		const body = JSON.stringify({
			title,
			priority: priorityValue,
			activity_group_id: ctx.todoMemoized.todo.id,
		});
		CreateTodoItems(body).then(() => {
			RefetchTodoItems(ctx.todoMemoized.todo.id).then(refetchRes => {
				ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
				ctx.isLoadingMemoized.setIsLoading(false);
			});
		});
	}
	return (
		<>
			{open && (
				<>
					<form
						className={styles.modalAdd}
						onSubmit={() => {
							handleAdd();
							setOpen(false);
						}}
					>
						<div className={styles.modalAddHeader}>
							<h1>Tambah List item</h1>
							<img onClick={() => setOpen(false)} src={close} alt='Close' />
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
							<div className={styles.priorityDropdown}>
								<div
									className={styles.buttonPriorityDropdown}
									style={
										showPriorityOptions
											? { background: '#F4F4F4' }
											: { background: 'white' }
									}
									onClick={() => setshowPriorityOptions(!showPriorityOptions)}
								>
									<div
										style={
											showPriorityOptions
												? { opacity: 0 }
												: { background: currentPriorityColor }
										}
										className={styles.priorityDropdownEclipse}
									></div>
									<span>
										{showPriorityOptions
											? 'Pilih Priority'
											: currentpriorityName}
									</span>
									<div className={styles.butttonPriorityDropdownArrow}>
										<img src={dropdownArrow} alt='Arrow' />
									</div>
								</div>
								{showPriorityOptions &&
									PRIORITY_CONDITIONS.map(PRIORITY_CONDITION => (
										<div
											key={PRIORITY_CONDITION.id}
											className={styles.priorityDropdownItem}
											id={PRIORITY_CONDITION.value}
											onClick={() => {
												setPriorityValue(PRIORITY_CONDITION.value);
												setcurrentPriorityColor(
													PRIORITY_CONDITION.priorityColor
												);
												setCurrentPriorityName(PRIORITY_CONDITION.name);
												setshowPriorityOptions(false);
											}}
										>
											<div>
												<div
													className={styles.priorityDropdownEclipse}
													style={{
														background: PRIORITY_CONDITION.priorityColor,
													}}
												></div>
												<div>{PRIORITY_CONDITION.name}</div>
											</div>
											{PRIORITY_CONDITION.name === currentpriorityName ? (
												<img src={check} alt='current check' />
											) : (
												<img
													src={check}
													style={{ opacity: 0 }}
													alt='current check'
												/>
											)}
										</div>
									))}
							</div>
						</div>
						<div className={styles.modalAddFooter}>
							<button
								className='addButton'
								style={{ width: '150px' }}
								disabled={!title}
							>
								Simpan
							</button>
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default AddTodoItemModal;

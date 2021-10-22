import React, { useContext, useState } from 'react';
import { DetailContext } from '../../../context/detail[id]Context';
import styles from '../detail.module.css';
import close from '../../../assets/close.svg';
import { PRIORITY_CONDITIONS } from '../text';
import dropdownArrow from '../../../assets/dropdownArrow.svg';
import check from '../../../assets/check.svg';
import { UpdateTodoItem, RefetchTodoItems } from '../../../api/todos';

const EditTodoItemModal = ({
	id,
	currentTitle,
	currentPriorityValue,
	open,
	setOpen,
}) => {
	const ctx = useContext(DetailContext);
	const [currentpriorityName, setCurrentPriorityName] = useState(
		PRIORITY_CONDITIONS.find(
			PRIORITY_CONDITION => PRIORITY_CONDITION.value === currentPriorityValue
		)
	);
	const [currentPriorityColor, setCurrentPriorityColor] = useState(
		PRIORITY_CONDITIONS.find(
			PRIORITY_CONDITION => PRIORITY_CONDITION.value === currentPriorityValue
		)
	);
	const [priorityColorSelected, setPriorityColorSelected] = useState('');
	const [priorityNameSelected, setPriorityNameSelected] = useState('');
	const [priorityValueSelected, setPriorityValueSelected] = useState('');
	const [title, setTitle] = useState(currentTitle);
	const [showPriorityOptions, setShowPriorityOptions] = useState(false);
	const [priorityValue, setPriorityValue] = useState(currentPriorityValue);

	async function handleEdit() {
		const body = JSON.stringify({
			title,
			priority: priorityValueSelected || priorityValue,
			is_active: 1,
		});
		const response = await UpdateTodoItem(id, body);
		const refetchRes = await RefetchTodoItems(ctx.todoMemoized.todo.id);
		ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
	}

	return (
		<>
			{open && (
				<>
					<div
						onClick={() => setOpen(false)}
						className={styles.modalOverlay}
					></div>
					<form
						className={styles.modalAdd}
						onSubmit={() => {
							handleEdit();
							setOpen(false);
						}}
					>
						<div className={styles.modalAddHeader}>
							<h1>Edit List item</h1>
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

							{/* Priority */}
							<label>PRIORITY</label>
							<div className={styles.priorityDropdown}>
								<div
									className={styles.buttonPriorityDropdown}
									style={
										showPriorityOptions
											? { background: '#F4F4F4' }
											: { background: 'white' }
									}
									onClick={() => setShowPriorityOptions(!showPriorityOptions)}
								>
									<div
										style={
											showPriorityOptions
												? { opacity: 0 }
												: {
														background:
															priorityColorSelected ||
															currentPriorityColor.priorityColor,
												  }
										}
										className={styles.priorityDropdownEclipse}
									></div>
									<span>
										{showPriorityOptions
											? 'Pilih Priority'
											: priorityNameSelected || currentpriorityName.name}
									</span>
									<div className={styles.butttonPriorityDropdownArrow}>
										<img src={dropdownArrow} alt='Arrow' />
									</div>
								</div>
							</div>
							{showPriorityOptions &&
								PRIORITY_CONDITIONS.map(PRIORITY_CONDITION => (
									<div
										key={PRIORITY_CONDITION.id}
										className={styles.priorityDropdownItem}
										id={PRIORITY_CONDITION.value}
										onClick={() => {
											setPriorityValueSelected(PRIORITY_CONDITION.value);
											setPriorityNameSelected(PRIORITY_CONDITION.name);
											setPriorityColorSelected(
												PRIORITY_CONDITION.priorityColor
											);
											setShowPriorityOptions(false);
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
										{PRIORITY_CONDITION.name === currentpriorityName.name ? (
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
						<div className={styles.modalAddFooter}>
							<button
								className='addButton'
								style={{ width: '150px' }}
								disabled={!title}
								type='submit'
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

export default EditTodoItemModal;

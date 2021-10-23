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
	setOpen,
	transition,
}) => {
	const overlayStyles = {
		entering: { opacity: 0 },
		entered: { opacity: 0.2, transition: '1s' },
		exiting: { opacity: 0, transition: '1s' },
	};
	const modalStyles = {
		entering: { inset: '200% 0 0 0' },
		entered: { inset: 0, transition: '1s' },
		exiting: { inset: '200% 0 0 0', transition: '1s' },
	};
	const ctx = useContext(DetailContext);
	const [currentPriorityName, setCurrentPriorityName] = useState(
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

	async function handleEdit(e) {
		e.preventDefault();
		const body = JSON.stringify({
			title,
			priority: priorityValueSelected || priorityValue,
		});
		await UpdateTodoItem(id, body);
		const refetchRes = await RefetchTodoItems(ctx.todoMemoized.todo.id);
		ctx.refetchTodoItemsMemoized.setRefetchTodoItems(refetchRes.data);
	}
	return (
		<>
			<div
				onClick={() => setOpen(false)}
				style={{
					...overlayStyles[transition],
				}}
				className={styles.modalOverlay}
			></div>
			<form
				onSubmit={e => {
					setOpen(false);
					handleEdit(e);
				}}
				style={{
					...modalStyles[transition],
				}}
				className={styles.modalAdd}
			>
				<div className={styles.modalAddHeader}>
					<h1>Edit item</h1>
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
									: priorityNameSelected || currentPriorityName.name}
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
										setPriorityValueSelected(PRIORITY_CONDITION.value);
										setPriorityNameSelected(PRIORITY_CONDITION.name);
										setPriorityColorSelected(PRIORITY_CONDITION.priorityColor);
										setShowPriorityOptions(false);
									}}
								>
									<div className={styles.priorityDropdownItemText}>
										<div
											className={styles.priorityDropdownEclipse}
											style={{
												background: PRIORITY_CONDITION.priorityColor,
											}}
										></div>
										<div>{PRIORITY_CONDITION.name}</div>
									</div>
									{PRIORITY_CONDITION.name === priorityNameSelected ? (
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
	);
};

export default EditTodoItemModal;

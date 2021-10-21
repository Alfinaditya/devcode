import React, { useContext } from 'react';
import { DetailContext } from '../../../context/detail[id]Context';
import styles from '../detail.module.css';
import close from '../../../assets/close.svg';
import PriorityDropdown from './PriorityDropdown';

const AddTodoItemModal = () => {
	const ctx = useContext(DetailContext);

	return (
		<>
			{ctx.showAddTodoItemModalMemoized.showAddTodoItemModal && (
				<>
					<form
						className={styles.modalAdd}
						onSubmit={e => {
							ctx.handleAdd(e);
							ctx.showAddTodoItemModalMemoized.setShowAddTodoItemModal(false);
						}}
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
							<PriorityDropdown />
						</div>
						<div className={styles.modalAddFooter}>
							<button
								className='addButton'
								style={{ width: '150px' }}
								disabled={!ctx.titleMemoized.title}
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

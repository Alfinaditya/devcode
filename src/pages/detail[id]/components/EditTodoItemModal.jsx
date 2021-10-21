import React, { useContext } from 'react';
import { DetailContext } from '../../../context/detail[id]Context';
import styles from '../detail.module.css';
import close from '../../../assets/close.svg';

const EditTodoItemModal = ({ id, title, priority, open, setOpen }) => {
	const ctx = useContext(DetailContext);
	return (
		<>
			{open && (
				<>
					<form
						className={styles.modalAdd}
						onSubmit={() => {
							ctx.handleUpdate();
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
								onChange={e => ctx.titleMemoized.setTitle(e.target.value)}
								type='text'
								placeholder='Tambahkan nama Activity'
							/>
							<label>PRIORITY</label>
							{/* <PriorityDropdown priority={priority} /> */}
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

export default EditTodoItemModal;

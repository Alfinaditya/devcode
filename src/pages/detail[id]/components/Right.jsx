import React, { useState } from 'react';
import styles from '../detail.module.css';
import Sort from './Sort';
import plus from '../../../assets/plus.svg';
import AddTodoItemModal from './AddTodoItemModal';

const Right = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className={styles.right}>
				<Sort />
				<button className='addButton' onClick={() => setOpen(true)}>
					<img src={plus} alt='Tambah' />
					<span className='addButtonText'>Tambah</span>
				</button>
				<AddTodoItemModal open={open} setOpen={setOpen} />
			</div>
		</>
	);
};

export default Right;

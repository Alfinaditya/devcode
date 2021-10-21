import React, { useState } from 'react';
import plusSvg from '../../../assets/plus.svg';
import AddTodoItemModal from './AddTodoItemModal';

const AddTodoItem = () => {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<button className='addButton' onClick={() => setOpen(true)}>
				<img src={plusSvg} alt='Tambah' />
				<span className='addButtonText'>Tambah</span>
			</button>
			<AddTodoItemModal open={open} setOpen={setOpen} />
		</div>
	);
};

export default AddTodoItem;

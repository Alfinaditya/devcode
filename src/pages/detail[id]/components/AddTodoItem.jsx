import React, { useContext } from 'react';
import plusSvg from '../../../assets/plus.svg';
import { DetailContext } from '../../../context/detail[id]Context';

const AddTodoItem = () => {
	const { showAddTodoItemModalMemoized: ctx } = useContext(DetailContext);
	console.log(ctx);
	return (
		<div>
			<button
				className='addButton'
				onClick={() => ctx.setShowAddTodoItemModal(true)}
			>
				<img src={plusSvg} alt='Tambah' />
				<span className='addButtonText'>Tambah</span>
			</button>
		</div>
	);
};

export default AddTodoItem;

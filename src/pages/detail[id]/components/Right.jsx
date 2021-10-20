import React, { useContext, useState } from 'react';
import styles from '../detail.module.css';
import { DetailContext } from '../../../context/detail[id]Context';
import AddTodoItem from './AddTodoItem';
import Sort from './Sort';

const Right = () => {
	return (
		<>
			<div className={styles.right}>
				<Sort />
				<AddTodoItem />
			</div>
		</>
	);
};

export default Right;

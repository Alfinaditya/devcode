import React from 'react';
import { DetailContextProvider } from '../../context/detail[id]Context';
import Header from './Header';
import TodoItems from './TodoItems';
import styles from './detail.module.css';
const Detail = () => {
	return (
		<DetailContextProvider>
			<div className={styles.detail}>
				<Header />
				<TodoItems />
			</div>
		</DetailContextProvider>
	);
};

export default Detail;

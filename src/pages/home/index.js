import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { GetTodos, CreateTodo, Refetch, RemoveTodo } from '../../api/todos';
import styles from './home.module.css';
import { convertDate } from '../../helpers/';
import Loading from '../../components/loading/Loading';
import plusSvg from '../../assets/plus.svg';
import todosEmptySvg from '../../assets/todosEmpty.svg';
import trashSvg from '../../assets/trash.svg';

const Home = () => {
	const history = useHistory();
	const {
		data: todos,
		setData: setTodos,
		isLoading,
		setIsLoading,
	} = GetTodos();
	const [initConfirmModal, setInitConfirmModal] = useState(false);
	const [params, setParams] = useState('');

	function handleAdd() {
		setIsLoading(true);
		CreateTodo().then(() => {
			Refetch().then(refetchRes => {
				setTodos(refetchRes.data);
				setIsLoading(false);
			});
		});
	}

	function handleDelete() {
		setIsLoading(true);
		RemoveTodo(params).then(() => {
			Refetch().then(refetchRes => {
				setTodos(refetchRes.data);
				setInitConfirmModal(false);
				setIsLoading(false);
			});
		});
	}

	return (
		<div className={styles.home}>
			<div className={styles.header}>
				<h1 className={styles.title}>Activity</h1>
				<button className={styles.addButton} onClick={handleAdd}>
					<img src={plusSvg} alt='Tambah Activity' />
					<span className={styles.addButtonText}>Tambah</span>
				</button>
			</div>
			{initConfirmModal && (
				<>
					<button onClick={() => setInitConfirmModal(false)}>No</button>
					<button
						onClick={() => {
							handleDelete();
						}}
					>
						yes
					</button>
				</>
			)}
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className={styles.cards}>
						{todos &&
							todos.map(todo => {
								const { date, month, years } = convertDate(todo.created_at);
								return (
									<div key={todo.id} className={styles.cardContainer}>
										<div className={styles.card}>
											<h1
												className={styles.cardTitle}
												onClick={() => history.push(`/detail/${todo.id}`)}
											>
												{todo.title}
											</h1>
											<div className={styles.cardFooter}>
												<p className={styles.cardDate}>
													{date} {month} {years}
												</p>
												<img
													src={trashSvg}
													alt='Delete'
													onClick={() => {
														setInitConfirmModal(true);
														setParams(todo.id);
													}}
												/>
											</div>
										</div>
									</div>
								);
							})}
					</div>
					{!todos.length && <img src={todosEmptySvg} alt='No todos' />}
				</>
			)}
		</div>
	);
};

export default Home;

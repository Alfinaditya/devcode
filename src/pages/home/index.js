import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { GetTodos, CreateTodo, Refetch, RemoveTodo } from '../../api/todos';
import styles from './home.module.css';
import { convertDate } from '../../helpers/';
import Loading from '../../components/loading/Loading';
import plusSvg from '../../assets/plus.svg';
import todosEmptySvg from '../../assets/todosEmpty.svg';
import trashSvg from '../../assets/trash.svg';
import modalInformationIcon from '../../assets/modalInformationIcon.svg';
import Animated from 'react-mount-animation';
import UseScrollBlock from '../../hooks/UseScrollBlock';
import ConfirmModal from '../../components/confirmModal';

const Home = () => {
	const history = useHistory();
	const [blockScroll, allowScroll] = UseScrollBlock();
	const {
		data: todos,
		setData: setTodos,
		isLoading,
		setIsLoading,
	} = GetTodos();
	const [initConfirmModal, setInitConfirmModal] = useState(false);
	const [params, setParams] = useState('');
	const [deleteTitle, setDeleteTitle] = useState('');
	const [successAlert, setSuccessAlert] = useState(false);

	function handleAdd() {
		setIsLoading(true);
		CreateTodo().then(() => {
			Refetch().then(refetchRes => {
				setTodos(refetchRes.data);
				setIsLoading(false);
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
				setSuccessAlert(true);
			});
		});
	}
	{
		initConfirmModal ? blockScroll() : allowScroll();
	}
	return (
		<>
			{/* Succes Alert */}
			<Animated.div
				onClick={() => setSuccessAlert(false)}
				className={styles.successModal}
				show={successAlert}
				mountAnim={`
					0% {inset: -200% 0 0 0 }
					100% {inset: 0}
					 `}
				unmountAnim={`
					0% {inset: 0}
					100% {inset: -200% 0 0 0 }
					`}
			>
				<img src={modalInformationIcon} alt='Information' />
				<p className={styles.successModalText}>Activity berhasil dihapus</p>
			</Animated.div>
			<Animated.div
				show={successAlert}
				onClick={() => setSuccessAlert(false)}
				className={styles.modalOverlay}
				mountAnim={`
					 0% {opacity:0}
					 100% {opacity:0.2}
					 `}
				unmountAnim={`
					 0% {opacity:0.2}
					 100% {opacity:0}
					`}
			></Animated.div>

			{/* Confirm Modal */}
			<ConfirmModal
				open={initConfirmModal}
				setOpen={setInitConfirmModal}
				handleDelete={handleDelete}
				title={deleteTitle}
			/>
			{/* Confirm Modal */}
			<div className={styles.home}>
				<div className={styles.header}>
					<h1 className={styles.title}>Activity</h1>
					<button className='addButton' onClick={handleAdd}>
						<img src={plusSvg} alt='Tambah Activity' />
						<span className='addButtonText'>Tambah</span>
					</button>
				</div>
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
															setDeleteTitle(todo.title);
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
		</>
	);
};

export default Home;

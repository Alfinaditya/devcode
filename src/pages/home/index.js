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
import UseScrollBlock from '../../hooks/UseScrollBlock';
import ConfirmModal from '../../components/confirmModal';
import { Transition } from 'react-transition-group';

const Home = () => {
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

	async function handleAdd() {
		setIsLoading(true);
		await CreateTodo();
		const refetchRes = await Refetch();
		setTodos(refetchRes.data);
		setIsLoading(false);
	}

	async function handleDelete() {
		setIsLoading(true);
		await RemoveTodo(params);
		const refetchRes = await Refetch();
		setTodos(refetchRes.data);
		setInitConfirmModal(false);
		setIsLoading(false);
		setSuccessAlert(true);
	}
	{
		initConfirmModal ? blockScroll() : allowScroll();
	}
	return (
		<>
			<Transition
				in={successAlert}
				timeout={{
					exit: 300,
				}}
				unmountOnExit
			>
				{state => (
					<>
						{/* Succes Alert */}
						<div
							onClick={() => setSuccessAlert(false)}
							style={{
								...modalStyles[state],
							}}
							className={styles.successModal}
						>
							<img src={modalInformationIcon} alt='Information' />
							<p className={styles.successModalText}>
								Activity berhasil dihapus
							</p>
						</div>
						<div
							onClick={() => setSuccessAlert(false)}
							style={{
								...overlayStyles[state],
							}}
							className={styles.modalOverlay}
						></div>
					</>
				)}
			</Transition>

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
						{!todos.length && (
							<img src={todosEmptySvg} onClick={handleDelete} alt='No todos' />
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Home;

import React from 'react';
import modalDeleteIcon from '../../assets/modalDeleteIcon.svg';
import styles from './confirmmodal.module.css';
import { Transition } from 'react-transition-group';

const ConfirmModal = ({ open, setOpen, handleDelete, title }) => {
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
	return (
		<>
			<Transition
				in={open}
				timeout={{
					exit: 400,
				}}
				unmountOnExit
			>
				{state => (
					<>
						<div
							onClick={() => setOpen(false)}
							style={{
								...overlayStyles[state],
							}}
							className={styles.modalOverlay}
						/>
						<div style={{ ...modalStyles[state] }} className={styles.modal}>
							<img src={modalDeleteIcon} alt='Icon' />
							<div className={styles.modalText}>
								<span>Apakah anda yakin menghapus activity </span>
								<span>“{title}”?</span>
							</div>
							<div>
								<button
									className={styles.cancelButton}
									onClick={() => setOpen(false)}
								>
									Batal
								</button>
								<button
									onClick={() => {
										handleDelete();
										setOpen(false);
									}}
									className={styles.deleteButton}
								>
									Hapus
								</button>
							</div>
						</div>
					</>
				)}
			</Transition>
		</>
	);
};

export default ConfirmModal;

import React from 'react';
import modalDeleteIcon from '../../assets/modalDeleteIcon.svg';
import styles from './confirmmodal.module.css';
import { Transition } from 'react-transition-group';

const ConfirmModal = ({ open, setOpen, handleDelete, title, things }) => {
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
						<div
							data-cy='modal-delete'
							style={{ ...modalStyles[state] }}
							className={styles.modal}
						>
							<img
								src={modalDeleteIcon}
								alt='Icon'
								data-cy='modal-delete-icon'
							/>
							<div data-cy='modal-delete-title' className={styles.modalText}>
								<span>Apakah anda yakin menghapus {things} </span>
								<span>“{title}”?</span>
							</div>
							<div>
								<button
									data-cy='modal-delete-cancel-button'
									className={styles.cancelButton}
									onClick={() => setOpen(false)}
								>
									Batal
								</button>
								<button
									data-cy='modal-delete-confirm-button'
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

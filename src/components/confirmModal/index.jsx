import React from 'react';
import Animated from 'react-mount-animation';
import modalDeleteIcon from '../../assets/modalDeleteIcon.svg';
import styles from './confirmmodal.module.css';
const ConfirmModal = ({ open, setOpen, handleDelete, title }) => {
	return (
		<>
			<Animated.div
				show={open}
				onClick={() => setOpen(true)}
				mountAnim={`
					 0% {opacity:0}
					 100% {opacity:0.2}
					 `}
				unmountAnim={`
					 0% {opacity:0.2}
					 100% {opacity:0}
					`}
				className={styles.modalOverlay}
			/>
			<Animated.div
				show={open}
				mountAnim={`
					0% {inset: 200% 0 0 0 }
					100% {inset: 0}
					 `}
				unmountAnim={`
					0% {inset: 0}
					100% {inset: 200% 0 0 0 }
					`}
				className={styles.modal}
			>
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
			</Animated.div>
		</>
	);
};

export default ConfirmModal;

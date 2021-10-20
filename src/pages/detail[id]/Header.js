import styles from './detail.module.css';
import Title from './components/Title';
import Right from './components/Right';

const Header = () => {
	return (
		<div className={styles.header}>
			<Title />
			<Right />
		</div>
	);
};

export default Header;

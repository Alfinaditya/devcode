import React from 'react';
import styles from './header.module.css';

const Header = () => {
	return (
		<nav className={styles.nav} data-cy='header-background'>
			<div className={styles.container}>
				<h1 className={styles.brand} data-cy='header-title'>
					TO DO LIST APP
				</h1>
			</div>
		</nav>
	);
};

export default Header;

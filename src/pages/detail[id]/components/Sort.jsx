import React, { useContext, useState } from 'react';
import sortButton from '../../../assets/sortButton.svg';
import { SORT_TYPES } from '../text';
import styles from '../detail.module.css';
import { DetailContext } from '../../../context/detail[id]Context';
import check from '../../../assets/check.svg';
const Sort = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { sortMemoized: ctx } = useContext(DetailContext);
	const [currentSort, setCurrentSort] = useState(SORT_TYPES[0].type);
	return (
		<div data-cy='todo-sort-button'>
			<img
				onClick={() => setShowDropdown(!showDropdown)}
				src={sortButton}
				alt='Sort'
			/>
			{showDropdown && (
				<div data-cy='sort-selection' className={styles.dropdown}>
					<div className={styles.dropdownItems}>
						{SORT_TYPES.map(SORT_TYPE => (
							<div
								key={SORT_TYPE.id}
								onClick={() => {
									ctx.setSort(SORT_TYPE.type);
									setCurrentSort(SORT_TYPE.type);
								}}
								className={styles.dropdownItem}
							>
								<div className={styles.dropdownItemText}>
									<img
										data-cy='sort-selection-icon'
										src={SORT_TYPE.icon}
										alt={SORT_TYPE.text}
									/>
									<span data-cy='sort-selection-title'>{SORT_TYPE.text}</span>
								</div>
								{SORT_TYPE.type === currentSort ? (
									<img
										data-cy='sort-selection-selected'
										src={check}
										alt='Selected'
									/>
								) : (
									<img src={check} style={{ opacity: 0 }} alt='Selected' />
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Sort;

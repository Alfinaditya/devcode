import React, { useContext, useState } from 'react';
import sortButton from '../../../assets/sortButton.svg';
import { SORT_TYPES } from '../text';
import styles from '../detail.module.css';
import { DetailContext } from '../../../context/detail[id]Context';

const Sort = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { sortMemoized: ctx } = useContext(DetailContext);
	return (
		<div>
			<img
				onClick={() => setShowDropdown(!showDropdown)}
				src={sortButton}
				alt='Sort'
			/>
			{showDropdown && (
				<div className={styles.dropdown}>
					<div className={styles.dropdownItems}>
						{SORT_TYPES.map(SORT_TYPE => (
							<div
								key={SORT_TYPE.id}
								onClick={() => ctx.setSort(SORT_TYPE.type)}
								className={styles.dropdownItem}
							>
								<img src={SORT_TYPE.icon} alt={SORT_TYPE.text} />
								<span>{SORT_TYPE.text}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Sort;

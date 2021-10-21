import React, { useState, useContext } from 'react';
import { PRIORITY_CONDITIONS } from '../text';
import { DetailContext } from '../../../context/detail[id]Context';
import check from '../../../assets/check.svg';
import dropdownArrow from '../../../assets/dropdownArrow.svg';
import styles from '../detail.module.css';

const PriorityDropdown = () => {
	const ctx = useContext(DetailContext);
	const [showPriorityOptions, setshowPriorityOptions] = useState(false);
	const [currentpriorityName, setCurrentPriorityName] = useState(
		PRIORITY_CONDITIONS[0].name
	);
	const [currentPriorityColor, setcurrentPriorityColor] = useState(
		PRIORITY_CONDITIONS[0].priorityColor
	);
	return (
		<div className={styles.priorityDropdown}>
			<div
				className={styles.buttonPriorityDropdown}
				style={
					showPriorityOptions
						? { background: '#F4F4F4' }
						: { background: 'white' }
				}
				onClick={() => setshowPriorityOptions(!showPriorityOptions)}
			>
				<div
					style={
						showPriorityOptions
							? { opacity: 0 }
							: { background: currentPriorityColor }
					}
					className={styles.priorityDropdownEclipse}
				></div>
				<span>
					{showPriorityOptions ? 'Pilih Priority' : currentpriorityName}
				</span>
				<div className={styles.butttonPriorityDropdownArrow}>
					<img src={dropdownArrow} alt='Arrow' />
				</div>
			</div>
			{showPriorityOptions &&
				PRIORITY_CONDITIONS.map(PRIORITY_CONDITION => (
					<div
						key={PRIORITY_CONDITION.id}
						className={styles.priorityDropdownItem}
						id={PRIORITY_CONDITION.value}
						onClick={() => {
							console.log(PRIORITY_CONDITION.value);
							ctx.priorityValueMemoized.setPriorityValue(
								PRIORITY_CONDITION.value
							);
							setcurrentPriorityColor(PRIORITY_CONDITION.priorityColor);
							setCurrentPriorityName(PRIORITY_CONDITION.name);
							setshowPriorityOptions(false);
						}}
					>
						<div>
							<div
								className={styles.priorityDropdownEclipse}
								style={{ background: PRIORITY_CONDITION.priorityColor }}
							></div>
							<div>{PRIORITY_CONDITION.name}</div>
						</div>
						{PRIORITY_CONDITION.name === currentpriorityName ? (
							<img src={check} alt='current check' />
						) : (
							<img src={check} style={{ opacity: 0 }} alt='current check' />
						)}
					</div>
				))}
		</div>
	);
};

export default PriorityDropdown;

import ascendingSort from '../../assets/ascendingSort.svg';
import descendingSort from '../../assets/descendingSort.svg';
import azSort from '../../assets/azSort.svg';
import zaSort from '../../assets/zaSort.svg';
import notCompletedSort from '../../assets/notCompletedSort.svg';

export const PRIORITY_CONDITIONS = [
	{
		id: 1,
		name: 'Very High',
		value: 'very-high',
	},
	{
		id: 2,
		name: 'High',
		value: 'high',
	},
	{
		id: 3,
		name: 'Medium',
		value: 'normal',
	},
	{
		id: 4,
		name: 'Low',
		value: 'low',
	},
	{
		id: 5,
		name: 'Very Low',
		value: 'very-low',
	},
];
export const SORT_TYPES = [
	{ id: 1, type: 'Ascending', text: 'Terbaru', icon: ascendingSort },
	{ id: 2, type: 'Descending', text: 'Terlama', icon: descendingSort },
	{ id: 3, type: 'A-Z', text: 'A-Z', icon: azSort },
	{ id: 4, type: 'Z-A', text: 'Z-A', icon: zaSort },
	{
		id: 5,
		type: 'notCompleted',
		text: 'Belum Selesai',
		icon: notCompletedSort,
	},
];

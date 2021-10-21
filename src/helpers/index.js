export function convertDate(dateValue) {
	const arrMonth = [
		'Januari',
		'Februari',
		'Maret',
		'April',
		'Mei',
		'Juni',
		'Juli',
		'Agustus',
		'September',
		'Oktober',
		'November',
		'Desember',
	];
	const newDate = new Date(dateValue);

	const month = arrMonth[newDate.getMonth()];
	const years = newDate.getFullYear().toString();
	const date = newDate.getDate().toString();

	if (!dateValue) {
		return { date: null, month: null, years: null };
	}
	return { date, month, years };
}

export function renderPriorityColor(priority) {
	let color;
	switch (priority) {
		case 'very-high':
			color = '#ED4C5C';
			break;

		case 'high':
			color = '#F8A541';
			break;
		case 'normal':
			color = '#00A790';
			break;

		case 'low':
			color = '#428BC1';
			break;

		case 'very-low':
			color = '#428BC1';
			break;

		default:
			break;
	}
	return color;
}

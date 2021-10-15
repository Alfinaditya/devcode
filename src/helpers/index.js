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

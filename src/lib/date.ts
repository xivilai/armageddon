/*
 * @returns date in the format: yyyy-mm-dd
 */
function getCurrentDateString(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  return dateString;
}

/*
 * @returns tomorrow date in the format: yyyy-mm-dd
 */
function getTomorrowDateString(): string {
  let today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let year = tomorrow.getFullYear();
  let month = ('0' + (tomorrow.getMonth() + 1)).slice(-2);
  let day = ('0' + tomorrow.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
}

function formatDateString(dateString: string) {
  const months = [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
}

export { getCurrentDateString, formatDateString, getTomorrowDateString };

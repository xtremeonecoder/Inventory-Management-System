export function getDateObject(dateString = null) {
  return dateString ? new Date(dateString) : new Date();
}

export function getMonths() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
}

export function getMonthString(month = 0) {
  const monthNames = getMonths();
  return monthNames[month];
}

export function getMonthNumber(month = null) {
  if (!month) return null;
  const months = getMonths();
  if (!months.includes(month)) return null;
  return months.indexOf(month);
}

export function currentMonth() {
  return getDateObject().getMonth();
}

export function getNextMonth(month = null) {
  if (month === null) {
    month = new Date().getMonth();
  }

  if (month === 11) return 0;
  return (month % 11) + 1;
}

export function currentMonthString() {
  const monthNames = getMonths();
  return monthNames[currentMonth()];
}

export function currentFullYear() {
  return getDateObject().getFullYear();
}

export function getFormattedDate(dateString = null, format = "yyyy-mm-dd") {
  // initiate date object
  let dateObj = getDateObject();
  if (dateString) {
    dateObj = getDateObject(dateString);
  }

  // adjust 0 before single digit date
  const date = ("0" + dateObj.getDate()).slice(-2);

  // current month
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

  // current year
  const year = dateObj.getFullYear();

  // prints date in YYYY-MM-DD format
  return format
    .toLowerCase()
    .replace("dd", date)
    .replace("mm", month)
    .replace("yyyy", year)
    .toString();
}

export default {
  getMonths,
  getDateObject,
  getMonthString,
  getMonthNumber,
  currentMonth,
  getNextMonth,
  currentMonthString,
  currentFullYear,
  getFormattedDate,
};

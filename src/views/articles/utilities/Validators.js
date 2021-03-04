import DateTime from "./../../ikea/utilities/DateTime";

// checks if record can be added in the expense history or not?
export function canAddExpenseRecord(expenseHistory) {
  let { expenseMonth = null, expenseYear = null } = expenseHistory || {};

  // checks for valid month or year
  if (!expenseMonth || !expenseYear) return null;

  // get history month and year
  expenseYear = parseInt(expenseYear);
  expenseMonth = DateTime.getMonthNumber(expenseMonth);

  // calculate start and end date of adding record to expense history
  const startDate = new Date(expenseYear, expenseMonth, 1).getTime();
  const endDate = new Date(expenseYear, expenseMonth + 1, 15).getTime();

  // evaluate current date of adding record
  const currentDate = new Date(
    DateTime.currentFullYear(),
    DateTime.currentMonth(),
    DateTime.getDateObject().getDate()
  ).getTime();

  // check if the expense record can be added to this history?
  if (currentDate >= startDate && currentDate <= endDate) {
    return true;
  }

  return false;
}

// checks if expense history can be created or not?
export function canCreateExpenseHistory(expenseHistory) {
  return false;
}

// checks if expense history can be submitted or not?
export function canSubmitExpenseHistory(expenseHistory) {
  return false;
}

export default {
  canAddExpenseRecord,
  canCreateExpenseHistory,
  canSubmitExpenseHistory,
};

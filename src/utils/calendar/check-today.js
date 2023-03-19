const checkDateIsEqual = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const checkToday = (date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};

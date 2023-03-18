const checkDateIsEqual = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const checkToday = (date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};

// export const isNotWeekend = () => {
//   const today = new Date();
//   const shortDay = today.toLocaleDateString(locale, { weekday: 'short' });

//   if (shortDay === 'пт') {
//     return checkDateIsNext(today, date, 3);
//   }

//   if (shortDay === 'сб') {
//     return checkDateIsNext(today, date, 2);
//   }

//   if (shortDay === 'вс') {
//     return checkDateIsNext(today, date, 1);
//   }
// };

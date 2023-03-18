const checkDateIsNext = (date1, date2, index) =>
  date1.getDate() + index === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const checkNextDay = (locale, date) => {
  const today = new Date();
  const shortDay = today.toLocaleDateString(locale, { weekday: 'short' });

  if (shortDay === 'пт') {
    return checkDateIsNext(today, date, 3);
  }

  if (shortDay === 'сб') {
    return checkDateIsNext(today, date, 2);
  }

  if (shortDay === 'вс') {
    return checkDateIsNext(today, date, 1);
  }

  return checkDateIsNext(today, date, 1);
};

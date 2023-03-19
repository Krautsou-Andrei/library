import { createDate } from './create-date';

const checkDateIsNext = (date1, date2, index) =>
  date1.getDate() + index === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

export const checkNextDay = (locale, date) => {
  const today = createDate(new Date());
  // const shortDay = today.toLocaleDateString('ru', { weekday: 'short' });
  const shortDay = today.dayNumberInWeek;
  console.log('shortDay', today);
  if (shortDay === 6) {
    return checkDateIsNext(today.date, date, 3);
  }

  if (shortDay === 7) {
    return checkDateIsNext(today.date, date, 2);
  }

  if (shortDay === 1) {
    return checkDateIsNext(today.date, date, 1);
  }

  return checkDateIsNext(today.date, date, 1);
};

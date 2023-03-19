import { checkNextDay } from './check-next-day';
import { checkToday } from './check-today';

export const checkDateIsEqual = (locale, date1, date2) => {
  if (checkToday(date1) || checkNextDay(locale, date2)) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  return false;
};

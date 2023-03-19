import { createDate } from './create-date';
import { getMonthNumberOfDays } from './get-month-number-of-days';

export const createMonth = (props) => {
  const date = props?.date || new Date();
  const locale = props?.locale || 'default';

  const nowDate = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = nowDate;

  const getDay = (dayNumber) => createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i++) {
      days[i] = getDay(i + 1);
    }

    return days;
  };

  return {
    monthName,
    monthIndex,
    monthNumber,
    year,
    getDay,
    createMonthDays,
  };
};

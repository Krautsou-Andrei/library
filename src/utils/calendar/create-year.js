import { createDate } from './create-date';
import { createMonth } from './create-month';

export const createYear = (props) => {
  const locale = props?.locale || 'default';

  const monthCount = 12;
  const today = createDate();

  const year = props?.year || today.year;
  const monthNumber = props?.monthNumber || today.monthNumber;

  const month = createMonth({ date: new Date(year, monthNumber - 1), locale });

  const getMonthDays = (monthIndex) => createMonth({ date: new Date(year, monthIndex), locale }).createMonthDays();

  const createYearMonthes = () => {
    const monthes = [];

    for (let i = 0; i <= monthCount - 1; i++) {
      monthes[i] = getMonthDays(i);
    }

    return monthes;
  };

  return {
    month,
    year,
    createYearMonthes,
  };
};

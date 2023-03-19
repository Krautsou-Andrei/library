import { getWeekNumber } from './get-week-number';

export const createDate = (props) => {
  const locale = props?.locale || 'default';

  const date = props?.date || new Date();

  const dayNumber = date.getDate();
  const day = date.toLocaleDateString(locale, { weekday: 'long' });
  const dayNumberInWeek = date.getDay() + 1;
  const dayShort = date.toLocaleDateString(locale, { weekday: 'short' });
  const yearShort = date.toLocaleDateString(locale, { year: '2-digit' });
  const month = date.toLocaleDateString(locale, { month: 'long' });
  const monthShort = date.toLocaleDateString(locale, { month: 'short' });
  const monthNumber = date.getMonth() + 1;
  const monthIndex = date.getMonth();
  const timestamp = date.getTime();
  const week = getWeekNumber(date);
  const year = date.getFullYear();

  return {
    date,
    dayNumber,
    day,
    dayNumberInWeek,
    dayShort,
    year,
    yearShort,
    month,
    monthShort,
    monthNumber,
    monthIndex,
    timestamp,
    week,
  };
};

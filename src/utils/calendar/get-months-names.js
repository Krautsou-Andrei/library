import { createDate } from './create-date';

export const getMonthsNames = (locale = 'default') => {
  const monthesNames = Array.from({ length: 12 });

  const today = new Date();

  monthesNames.forEach((any, i) => {
    const { month, monthIndex, monthShort, date } = createDate({
      locale,
      date: new Date(today.getFullYear(), today.getMonth() + i, 1),
    });

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });

  return monthesNames;
};

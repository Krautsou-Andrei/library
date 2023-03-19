import { useMemo, useState } from 'react';
import { createMonth, getMonthNumberOfDays, createDate, getWeekDaysNames, getMonthsNames } from '../../utils/calendar';

const DAYS_IN_WEEK = 7;

export const useCalendar = ({ locale = 'default', date, firstWeekDayNumber = 2 }) => {
  const [selectedDay, setSelectedDay] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale })
  );

  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const [isShowMonths, setShowMonts] = useState(false);

  const monthesNames = useMemo(() => getMonthsNames(locale), [locale]);
  const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), [firstWeekDayNumber, locale]);

  const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth]);

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;
    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i += 1) {
      const inverted = numberOfPrevDays - i;
      result[i] = prevMonthDays[prevMonthDays.length - inverted];
    }

    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i += 1) {
      result[i] = days[i - numberOfPrevDays];
    }

    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i += 1) {
      result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
    }

    return result;
  }, [selectedMonth.monthIndex, selectedYear, days, firstWeekDayNumber, locale]);

  const onClickArrowPrev = () => {
    setSelectedMonth(createMonth({ date: new Date(selectedMonth.year, selectedMonth.monthIndex - 1), locale }));
    setSelectedDay(createDate({ date: new Date(selectedMonth.year, selectedMonth.monthIndex - 1), locale }));
    setSelectedYear(selectedMonth.monthIndex === 0 ? selectedMonth.year - 1 : selectedMonth.year);
  };

  const onClickArrowNext = () => {
    setSelectedMonth(createMonth({ date: new Date(selectedMonth.year, selectedMonth.monthIndex + 1), locale }));
    setSelectedDay(createDate({ date: new Date(selectedMonth.year, selectedMonth.monthIndex + 1), locale }));
    setSelectedYear(selectedMonth.monthIndex === 11 ? selectedMonth.year + 1 : selectedMonth.year);
  };

  const onClickSelectMonts = (event) => {
    setShowMonts(!isShowMonths);
  };

  const onClickMonth = (event) => {
    event.preventDefault();
    setSelectedMonth(createMonth({ date: new Date(selectedMonth.year, event.target.value), locale }));
    setSelectedDay(createDate({ date: new Date(selectedMonth.year, selectedMonth.monthIndex), locale }));
    setSelectedYear(selectedMonth.year);
    setShowMonts(!isShowMonths);
  };

  const setSelectedMonthByIndex = (monthIndex) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
  };

  return {
    state: {
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      isShowMonths,
    },
    functions: {
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedMonth,
      onClickArrowPrev,
      onClickArrowNext,
      setShowMonts,
      onClickSelectMonts,
      onClickMonth,
    },
  };
};

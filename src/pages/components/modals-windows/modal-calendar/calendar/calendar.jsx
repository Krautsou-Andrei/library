import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useCalendar } from '../../../../../hooks/calendar/calendar';
import { checkDateIsEqual, checkNextDay, checkToday } from '../../../../../utils/calendar';

import style from './calendar.module.scss';

export const Calendar = ({
  locale,
  date,
  selectDate,
  firstWeekDayNumber = 2,
  setDateBooking,
  setBookingDisabled,
  isBookingDisabled,
  currentDateBooking,
}) => {
  const { functions, state } = useCalendar({ locale, date, firstWeekDayNumber });
  const [selectDay, setSelectDay] = useState(false);
  const [a, setA] = useState(false);

  const onClickDay = (event) => {
    setDateBooking(new Date(state.selectedMonth.year, state.selectedMonth.monthIndex, event.target.innerHTML));
  };

  return (
    <div className={style.calendar} data-test-id='calendar'>
      <div className={style['calendar__header-calendar']}>
        <div className={style['calendar__month-calendar']}>
          <div className={classNames(style['month-options'], { [style.active]: state.isShowMonths })}>
            {state.monthesNames.map((month, index) => (
              <div key={`${index + 1}`}>
                <input
                  id={`month-${month.month}`}
                  type='checkbox'
                  name='month'
                  value={`${month.monthIndex}`}
                  className={style['month-input']}
                  onClick={functions.onClickMonth}
                />
                <label className={style['month-value']} htmlFor={`month-${month.month}`}>
                  {month.month}
                </label>
              </div>
            ))}
          </div>
          <button
            className={style.month}
            type='button'
            onClick={functions.onClickSelectMonts}
            data-test-id='month-select'
          >
            <span className={style['select-month']}>{state.selectedMonth.monthName}</span>

            <span className={style.year}>{state.selectedMonth.year}</span>
            <div className={style['arrow-select-month']} />
          </button>
        </div>
        <div>
          <button
            type='button'
            aria-label='arrow prev'
            className={style['arrow-prev-month']}
            onClick={functions.onClickArrowPrev}
            data-test-id='button-prev-month'
          />
          <button
            type='button'
            aria-label='arrow next'
            className={style['arrow-next-month']}
            onClick={functions.onClickArrowNext}
            data-test-id='button-next-month'
          />
        </div>
      </div>
      <div className={style['calendar__day-of-week']}>
        {state.weekDaysNames.map((day, index) => (
          <span className={style['day-of-week']} key={`${index + 1}`}>
            {day.dayShort}
          </span>
        ))}
      </div>
      <div className={style['calendar__body-calendar']}>
        {state.calendarDays.map((day, index) => {
          const isWeekend =
            (day.dayShort === 'сб' || day.dayShort === 'вс') && day.monthIndex === state.selectedMonth.monthIndex;
          const isToday = checkToday(day.date);
          const isNextDay = checkNextDay(locale, day.date);
          const isSelectDay =
            (selectDay || !!currentDateBooking) && checkDateIsEqual(locale, day.date, state.selectedDay.date);

          return (
            <button
              className={classNames(
                style.day,
                { [style.weekend]: isWeekend },
                { [style.today]: isToday },
                { [style['next-day']]: isNextDay },
                { [style['day-select']]: isSelectDay }
              )}
              type='button'
              key={`${index + 1}`}
              onClick={(event) => {
                functions.setSelectedDay(day);
                selectDate(day.date);
                setSelectDay(true);
                onClickDay(event);
                // const isBookingDay = checkDateIsEqual(locale, new Date(currentDateBooking), state.selectedDay.date);
                // console.log('isBookingDay', isBookingDay);
                setBookingDisabled(!((isToday || isNextDay) && !isWeekend));
              }}
              data-test-id='day-button'
            >
              {day.dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

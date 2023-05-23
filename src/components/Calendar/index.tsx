import { useState } from "react";

import { addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

import Header from "./Header";
import Days from "./Days";
import MonthlyCells from "./Cells";
import WeeklyCalendar from "./WeeklyCalendar";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isWeeklyView, setIsWeeklyView] = useState(true);

  const switchView = () => setIsWeeklyView(!isWeeklyView);
  const onDateClick = (day: Date) => setSelectedDate(day);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  return (
    <>
      {isWeeklyView ? (
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-[#fefebf] py-2">
          <WeeklyCalendar
            switchView={switchView}
            currentWeek={currentWeek}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            prevWeek={prevWeek}
            nextWeek={nextWeek}
          />
        </div>
      ) : (
        <div className="im-hyemin-r flex w-full flex-col items-center justify-center py-2">
          <Header
            currentMonth={currentMonth}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            switchView={switchView}
          />
          <Days />
          <MonthlyCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>
      )}
    </>
  );
};

export default Calendar;

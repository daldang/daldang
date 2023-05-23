import { useState } from "react";

import { addMonths, subMonths } from "date-fns";

import Header from "./Header";
import Days from "./Days";
import MonthlyCells from "./Cells";
import WeeklyCalendar from "./WeeklyCalendar";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isWeeklyView, setIsWeeklyView] = useState(false);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const switchView = () => setIsWeeklyView(!isWeeklyView);

  const onDateClick = (day: Date) => setSelectedDate(day);

  return (
    <>
      {isWeeklyView ? (
        <WeeklyCalendar />
      ) : (
        <div className="im-hyemin-r flex w-full flex-col items-center justify-center rounded-xl p-4">
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

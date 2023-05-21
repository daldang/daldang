import { useState } from "react";
import Header from "./Header";
import Days from "./Days";
import MonthlyCells from "./Cells";

import { addMonths, subMonths } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isWeeklyView, setIsWeeklyView] = useState(true);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const switchView = () => setIsWeeklyView(!isWeeklyView);

  const onDateClick = (day: Date) => setSelectedDate(day);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-amber-200">
      <Header
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        switchView={switchView}
      />
      <Days />
      {isWeeklyView ? (
        <div>위클리 준비중</div>
      ) : (
        <MonthlyCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      )}
    </div>
  );
};

export default Calendar;

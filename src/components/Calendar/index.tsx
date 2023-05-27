import { useState } from "react";

import { useRouter } from "next/router";

import { addMonths, addWeeks, subMonths, subWeeks } from "date-fns";

import { type DesertLogOutput } from "~/utils/type";
import { useSessionStorageRequestState } from "~/utils/hook";

import MonthlyCells from "./Cells";
import Days from "./Days";
import Header from "./Header";
import WeeklyCalendar from "./WeeklyCalendar";

interface IProps {
  isWeeklyView: boolean;
  switchView(): void;
  data?: DesertLogOutput[];
}

const Calendar = ({ isWeeklyView, switchView, data }: IProps) => {
  const router = useRouter();

  const [request, setRequest] = useSessionStorageRequestState();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    setRequest({ ...request, date: day });

    if (new Date()) {
      void router.push("/record");
    }
  };

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  return (
    <>
      {isWeeklyView ? (
        <div className="flex w-full flex-col items-center justify-center rounded-xl py-2">
          <WeeklyCalendar
            switchView={switchView}
            currentWeek={currentWeek}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            prevWeek={prevWeek}
            nextWeek={nextWeek}
            data={data}
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
            data={data}
          />
        </div>
      )}
    </>
  );
};

export default Calendar;

/* eslint-disable */
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  addDays,
  addMonths,
  addWeeks,
  isSameDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

import { useSessionStorageRequestState } from "~/utils/hook";
import { type DesertLogOutput } from "~/utils/type";

import MonthlyCells from "./Cells";
import Days from "./Days";
import Header from "./Header";
import WeeklyCalendar from "./WeeklyCalendar";

interface IProps {
  isWeeklyView: boolean;
  switchView(): void;
  data: any[];
  setWeeklyData: any;
  weeklyData?: DesertLogOutput[] | [];
  setWeeklyDataFull: any;
  weeklyDataFull: DesertLogOutput[] | any[];
}

const Calendar = ({
  isWeeklyView,
  switchView,
  data,
  setWeeklyData,
  weeklyData,
  setWeeklyDataFull,
  weeklyDataFull,
}: IProps) => {
  const router = useRouter();

  const [request, setRequest] = useSessionStorageRequestState();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [monthLength, setMonthLength] = useState(0);
  const [monthlyData, setMonthlyData] = useState<DesertLogOutput[] | []>([]);

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

  const handleRefineWeeklyData = () => {
    if (data && data.length > 0) {
      const startDate = startOfWeek(currentWeek);
      let day = startDate;
      const days = [];

      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(cloneDay);

        day = addDays(day, 1);
      }

      const dataArr = [];
      const dataArrFull: any[] = Array.from({ length: 7 }, () => false);

      for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < days.length; i++) {
          if (isSameDay(days[i] || new Date(), data[j]?.date || new Date())) {
            dataArr.push(data[j]);
            dataArrFull[i] = data[j];
          }
        }
      }

      setWeeklyData([...dataArr]);
      setWeeklyDataFull([...dataArrFull]);
    }
  };

  const handleRefineMonthlyData = () => {
    if (data && data.length > 0) {
      const monthStart = startOfMonth(currentMonth);
      const startDate = startOfWeek(monthStart);

      let day = startDate;
      const days: any[] = [];

      for (let i = 0; i < monthLength; i++) {
        const cloneDay = day;
        days.push(cloneDay);

        day = addDays(day, 1);
      }

      const dataArr: any[] = Array.from({ length: days.length }, () => false);
      for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < days.length; i++) {
          if (isSameDay(days[i], data[j] && data[j]?.date)) {
            dataArr[i] = data[j];
          }
        }
      }

      setMonthlyData([...dataArr]);
    }
  };

  useEffect(() => {
    void handleRefineWeeklyData();
  }, [currentWeek]);

  useEffect(() => {
    if (data.length > 0 && !isWeeklyView) {
      void handleRefineMonthlyData();
    }
  }, [!isWeeklyView]);

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
            data={weeklyDataFull}
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
            data={monthlyData}
            setMonthLength={setMonthLength}
          />
        </div>
      )}
    </>
  );
};

export default Calendar;

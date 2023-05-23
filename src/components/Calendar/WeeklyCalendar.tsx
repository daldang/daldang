/* eslint-disable */
import {
  format,
  startOfMonth,
  startOfWeek,
  isSameDay,
  addDays,
  isSameWeek,
} from "date-fns";

interface IProps {
  switchView(): void;
  currentWeek: Date;
  selectedDate: Date;
  onDateClick: any;
  prevWeek(): void;
  nextWeek(): void;
}

const WeeklyCalendar = ({
  switchView,
  currentWeek,
  selectedDate,
  onDateClick,
  prevWeek,
  nextWeek,
}: IProps) => {
  return (
    <>
      <WeeklyHeader
        switchView={switchView}
        prevWeek={prevWeek}
        nextWeek={nextWeek}
      />
      <WeeklyCells
        currentWeek={currentWeek}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
      />
    </>
  );
};

interface IWHProps {
  switchView(): void;
  prevWeek(): void;
  nextWeek(): void;
}

const WeeklyHeader = ({ switchView, prevWeek, nextWeek }: IWHProps) => {
  return (
    <div className="im-hyemin-r flex w-full flex-row items-center justify-between px-4 py-2 text-sm">
      <button type="button" className="" onClick={prevWeek}>
        지난주
      </button>
      <button
        type="button"
        onClick={switchView}
        className="flex flex-col items-center justify-center"
      >
        <span className="im-hyemin-b text-xl">주간 기록 ▼</span>
      </button>
      <button type="button" className="" onClick={nextWeek}>
        다음주
      </button>
    </div>
  );
};

interface IWCProps {
  currentWeek: Date;
  selectedDate: Date;
  onDateClick: any;
}

const WeeklyCells = ({ currentWeek, selectedDate, onDateClick }: IWCProps) => {
  const weekStart = startOfMonth(currentWeek);
  const startDate = startOfWeek(currentWeek);

  const dates = ["일", "월", "화", "수", "목", "금", "토"];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  for (let i = 0; i < 7; i++) {
    formattedDate = format(day, "d");
    const cloneDay = day;
    days.push(
      <button
        type="button"
        className={`flex flex-col items-center rounded-xl border border-slate-500 py-2 text-sm text-slate-500 ${
          !isSameWeek(day, currentWeek)
            ? "disabled text-slate-300 "
            : isSameDay(day, selectedDate)
            ? "border-0 bg-violet-300 text-white "
            : format(currentWeek, "M") !== format(day, "M")
            ? "not-valid"
            : "valid"
        }`}
        key={day.toString()}
        onClick={() => onDateClick(cloneDay)}
      >
        <span
          className={
            format(currentWeek, "M") !== format(day, "M")
              ? "text not-valid pb-2 text-lg font-bold"
              : "pb-2 text-lg font-bold"
          }
        >
          {formattedDate}
        </span>
        <span>{dates[i]}</span>
      </button>
    );
    day = addDays(day, 1);
  }

  const recordedCheck = [];
  for (let i = 0; i < 7; i++) {
    if (i === 1 || i === 2) {
      recordedCheck.push(
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-xs">
          기록
        </div>
      );
    } else {
      recordedCheck.push(<div></div>);
    }
  }

  return (
    <>
      <div className="grid w-full grid-cols-7 gap-x-3 p-4">{days}</div>
      <div className="grid w-full grid-cols-7 gap-x-3 p-4 pt-0">
        {recordedCheck}
      </div>
    </>
  );
};

export default WeeklyCalendar;

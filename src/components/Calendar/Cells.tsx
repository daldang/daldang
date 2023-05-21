/* eslint-disable */
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parse,
} from "date-fns";

interface IProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: any;
}

const RenderCells = ({ currentMonth, selectedDate, onDateClick }: IProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <button
          type="button"
          className={`flex flex-col ${
            !isSameMonth(day, monthStart)
              ? "disabled text-slate-300 "
              : isSameDay(day, selectedDate)
              ? "text-red-500 "
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day.toString()}
          onClick={() =>
            onDateClick(parse(cloneDay.toString(), "d", new Date()))
          }
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </button>
      );
      day = addDays(day, 1);
    }

    rows.push(
      <div
        className="flex w-full flex-row items-center justify-evenly"
        key={day.toString()}
      >
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="flex w-full flex-col items-center justify-evenly">
      {rows}
    </div>
  );
};

export default RenderCells;

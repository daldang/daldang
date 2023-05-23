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
          className={`block px-1 py-4 text-sm ${
            !isSameMonth(day, monthStart)
              ? "disabled text-slate-300 "
              : isSameDay(day, selectedDate)
              ? "im-hyemin-b text-violet-400 "
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day.toString()}
          onClick={() => onDateClick(cloneDay)}
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
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="flex w-full flex-col rounded-2xl bg-[#fefebf] px-2 py-4">
      {rows}
    </div>
  );
};

export default RenderCells;

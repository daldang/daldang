/* eslint-disable */
import Image from "next/image";
import { useRouter } from "next/router";

import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { DesertLogOutput } from "~/utils/type";

interface IProps {
  currentMonth: Date;
  selectedDate?: Date;
  onDateClick: any;
  data: DesertLogOutput[];
}

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  data,
}: IProps) => {
  const router = useRouter();

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
        <div
          className={`relative block px-1 py-4 text-center text-sm text-[#7d7d7d] ${
            !isSameMonth(day, monthStart)
              ? "disabled text-[#C6C6C6] "
              : // : isSameDay(day, selectedDate)
              // ? "im-hyemin-b "
              format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          } ${
            i === 0
              ? "text-[#FF8986]"
              : i === 6
              ? "text-[#9CA0FF]"
              : "text-[#7d7d7d]"
          }`}
          key={day.toString()}
        >
          {data[i] && isSameDay(day, data[i].date || new Date()) ? (
            <button
              type="button"
              className="absolute left-1 right-0 top-1/2 mx-auto w-full -translate-y-[50%] text-center"
              onClick={() => void router.push(`/records/${data[i]?.id}`)}
            >
              <Image
                src={`/characters/${data[i]?.desertCharacter}.svg`}
                alt="marker"
                width={40}
                height={40}
              />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onDateClick(cloneDay)}
              disabled={isAfter(day, new Date())}
              className={
                format(currentMonth, "M") !== format(day, "M")
                  ? "text not-valid"
                  : ""
              }
            >
              {formattedDate}
            </button>
          )}
        </div>
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
    <div className="flex w-full flex-col gap-y-1 rounded-2xl bg-[#fefebf] px-2 py-4">
      {rows}
    </div>
  );
};

export default RenderCells;

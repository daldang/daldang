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
import Link from "next/link";

interface IProps {
  currentMonth: Date;
  selectedDate?: Date;
  onDateClick: any;
  data: any[];
  setMonthLength: any;
}

const RenderCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  data,
  setMonthLength,
}: IProps) => {
  const router = useRouter();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  let currentMonthLength = 0;

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  let memo = 0;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const cloneDay = day;
      days.push(
        <div
          className={`relative block px-1 py-4 text-center text-sm text-[#7d7d7d] ${
            i === 0 && isSameMonth(day, monthStart)
              ? "text-[#FF8986]"
              : i === 6
              ? "text-[#9CA0FF]"
              : "text-[#7d7d7d]"
          } ${
            !isSameMonth(day, monthStart)
              ? "disabled text-[#C6C6C6] "
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day.toString()}
        >
          {data[memo] && isSameDay(day, data[memo]?.date) ? (
            <Link
              className="absolute left-2 right-0 top-1/2 mx-auto w-full -translate-y-[50%] p-0 text-center"
              href={`/records/${data[memo] ? data[memo]?.id : ""}`}
            >
              <Image
                src={`/characters/${data[memo]?.desertCharacter}.svg`}
                alt="marker"
                width={40}
                height={40}
              />
            </Link>
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
      if (isSameMonth(day, monthStart)) {
        currentMonthLength++;
      }
      day = addDays(day, 1);
      memo++;
    }

    rows.push(
      <div className="grid grid-cols-7" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  setMonthLength(currentMonthLength);

  return (
    <div className="flex w-full flex-col gap-y-1 rounded-2xl bg-[#fefebf] px-2 py-4">
      {rows}
    </div>
  );
};

export default RenderCells;

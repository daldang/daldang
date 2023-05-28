/* eslint-disable */
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  addDays,
  format,
  isAfter,
  isSameDay,
  isSameWeek,
  startOfWeek,
} from "date-fns";
import { DesertLogOutput } from "~/utils/type";

interface IProps {
  switchView(): void;
  currentWeek: Date;
  selectedDate: Date;
  onDateClick: any;
  prevWeek(): void;
  nextWeek(): void;
  data?: DesertLogOutput[];
}

const WeeklyCalendar = ({
  switchView,
  currentWeek,
  selectedDate,
  onDateClick,
  prevWeek,
  nextWeek,
  data,
}: IProps) => {
  const [weeklyData, setWeeklyData] = useState<DesertLogOutput[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setWeeklyData([...data]);
    }
    console.log(data);
  }, [data]);

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
        weeklyData={weeklyData}
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
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        key={i}
        className={`text-center ${
          date[i] === "일"
            ? "text-[#FF8986]"
            : date[i] === "토"
            ? "text-[#9CA0FF]"
            : "text-[#7d7d7d]"
        }`}
      >
        {date[i]}
      </div>
    );
  }

  return (
    <>
      <div className="im-hyemin-r flex w-full flex-row items-center justify-between px-4 py-2 text-sm">
        <button type="button" className="" onClick={prevWeek}>
          지난주
        </button>
        <button
          type="button"
          onClick={switchView}
          className="flex flex-row items-center justify-center"
        >
          <span className="im-hyemin-b mr-2 text-xl">주간 기록</span>
          <Image
            src="/icons/icon_down.svg"
            alt="down button"
            width={14}
            height={14}
          />
        </button>
        <button type="button" className="" onClick={nextWeek}>
          다음주
        </button>
      </div>
      <div className="im-hyemin-r grid w-full grid-cols-7 px-2 py-4">
        {days}
      </div>
    </>
  );
};

interface IWCProps {
  currentWeek: Date;
  selectedDate?: Date;
  onDateClick: any;
  weeklyData: DesertLogOutput[];
}

const WeeklyCells = ({
  currentWeek,
  selectedDate,
  onDateClick,
  weeklyData,
}: IWCProps) => {
  const router = useRouter();

  const startDate = startOfWeek(currentWeek);

  let days = [];
  let day = startDate;
  let formattedDate = "";

  const tempArr: any[] = Array.from({ length: 7 }, (_, i) => i);
  for (let j = 0; j < weeklyData.length; j++) {
    for (let i = 0; i < 7; i++) {
      if (new Date(weeklyData[j]?.date || new Date()).getDay() === i) {
        tempArr[i] = weeklyData[j];
      } else {
        tempArr[i] = false;
      }
    }
  }

  for (let i = 0; i < 7; i++) {
    formattedDate = format(day, "d");
    const cloneDay = day;
    console.log(i, isSameDay(day, weeklyData[i]?.date || new Date()));

    days.push(
      <div
        className={`im-hyemin-r relative block px-1 py-4 text-center text-sm text-[#7d7d7d] ${
          !isSameWeek(day, currentWeek)
            ? "disabled text-slate-300 "
            : format(currentWeek, "M") !== format(day, "M")
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
        {tempArr[i] !== false &&
        isSameDay(day, tempArr[i]?.date || new Date()) ? (
          <button
            type="button"
            className="absolute left-0 right-0 top-1/2 mx-auto -translate-y-[50%]"
            onClick={() =>
              void router.push(`/records/${tempArr ? tempArr[i]?.id : ""}`)
            }
          >
            <Image
              src={`/characters/${tempArr[i]?.desertCharacter}.svg`}
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
              format(currentWeek, "M") !== format(day, "M")
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

  return (
    <div className="grid w-full grid-cols-7 gap-x-3 gap-y-1 rounded-2xl bg-[#fefebf] p-4">
      {days}
    </div>
  );
};

export default WeeklyCalendar;

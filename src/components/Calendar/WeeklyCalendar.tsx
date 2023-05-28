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
  const [weeklyData, setWeeklyData] = useState<DesertLogOutput[] | boolean[]>(
    []
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setWeeklyData([...data]);
    }
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
  weeklyData: DesertLogOutput[] | any[];
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

  for (let i = 0; i < 7; i++) {
    formattedDate = format(day, "d");
    const cloneDay = day;

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
        {weeklyData[i] !== false &&
        isSameDay(day, weeklyData[i] && weeklyData[i]?.date) ? (
          <button
            type="button"
            className="absolute left-0 right-0 top-1/2 mx-auto -translate-y-[50%]"
            onClick={() =>
              void router.push(
                `/records/${weeklyData[i] ? weeklyData[i]?.id : ""}`
              )
            }
          >
            <Image
              src={`/characters/${weeklyData[i]?.desertCharacter}.svg`}
              // src="/markers/marker.svg"
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

import { format } from "date-fns";

interface IProps {
  currentMonth: Date | number;
  prevMonth(): void;
  nextMonth(): void;
  switchView(): void;
}

const RenderHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
  switchView,
}: IProps) => {
  return (
    <div className="flex w-full flex-row items-center justify-between px-4 py-2 text-sm">
      <button type="button" className="" onClick={prevMonth}>
        지난달
      </button>
      <button
        type="button"
        onClick={switchView}
        className="flex flex-col items-center justify-center"
      >
        <span className="im-hyemin-b text-xl">
          {format(currentMonth, "yyyy.MM")}
        </span>
      </button>
      <button type="button" className="" onClick={nextMonth}>
        다음달
      </button>
    </div>
  );
};

export default RenderHeader;

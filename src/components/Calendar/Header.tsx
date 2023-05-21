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
    <div className="flex w-full flex-row items-center justify-between">
      <button type="button" className="" onClick={prevMonth}>
        prev
      </button>
      <button
        type="button"
        onClick={switchView}
        className="flex flex-col items-center justify-center"
      >
        {/* <span>{format(currentMonth, "yyyy")}년</span> */}
        <span> {format(currentMonth, "M")}월</span>
      </button>
      <button type="button" className="" onClick={nextMonth}>
        next
      </button>
    </div>
  );
};

export default RenderHeader;

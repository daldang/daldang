const RenderDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div key={i} className="text-center">
        {date[i]}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-row items-center justify-evenly py-2">
      {days}
    </div>
  );
};

export default RenderDays;

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

  return <div className="grid w-full grid-cols-7 px-4 py-2">{days}</div>;
};

export default RenderDays;

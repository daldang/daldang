const RenderDays = () => {
  const days = [];
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div
        key={i}
        className={`text-center ${
          date[i] === "일"
            ? "text-red-400"
            : date[i] === "토"
            ? "text-indigo-400"
            : "text-slate-400"
        }`}
      >
        {date[i]}
      </div>
    );
  }

  return <div className="grid w-full grid-cols-7 px-2 py-4">{days}</div>;
};

export default RenderDays;

const RenderDays = () => {
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

  return <div className="grid w-full grid-cols-7 px-2 py-4">{days}</div>;
};

export default RenderDays;

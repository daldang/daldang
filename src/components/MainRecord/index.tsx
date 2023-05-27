import Image from "next/image";

import { getDay } from "date-fns";
import { type DesertLogOutput } from "~/utils/type";

const MainRecord = ({ data }: { data: DesertLogOutput }) => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex w-full flex-row items-center justify-center gap-x-3 rounded-lg bg-[#F9F9F8] px-[12px] py-[14px]">
      <div className="flex h-full flex-col items-center justify-between">
        <Image
          src={`/characters/${data.desertCharacter}.svg`}
          alt="디저트 캐릭터"
          width={70}
          height={70}
        />
        <span className="mt-[10px] text-base text-[#FF6562]">
          {data.score.toString()}kcal
        </span>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-start">
        <div className="mb-1 flex w-full flex-row items-center justify-between">
          <span className="flex items-center justify-center text-base text-[#222222]">
            {data.desertName}
          </span>
          <span className="im-hyemin-r flex items-center justify-center text-sm text-[#ffaaa8]">
            {date[Number(getDay(data.createdAt))]}요일
          </span>
        </div>
        <p className="w-full break-keep text-left text-sm text-[#595959]">
          {data.content}
        </p>
      </div>
    </div>
  );
};

export default MainRecord;

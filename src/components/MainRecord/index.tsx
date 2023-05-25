import Image from "next/image";

const MainRecord = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-x-3 rounded-lg bg-[#F9F9F8] px-[10px] py-[14px]">
      <div className="flex h-full flex-col items-center justify-between">
        <Image
          src="/characters/macaroon.svg"
          alt="디저트 캐릭터"
          width={70}
          height={70}
        />
        <span className="mt-[10px] text-base text-[#FF6562]">100kcal</span>
      </div>
      <div className="flex w-full flex-col items-center justify-between">
        <div className="mb-1 flex w-full flex-row items-center justify-between">
          <span className="text-base text-[#222222]">샤인머스캣 마카롱</span>
          <span className="im-hyemin-r text-sm text-[#ffaaa8]">월요일</span>
        </div>
        <p className="break-keep text-sm text-[#595959]">
          언니랑 오랜만에 최애 마카롱집 간 날- 샤인머스캣 오랜만에 먹었는데
          다섯개 사왔어야 했다...진짜 미친맛..
        </p>
      </div>
    </div>
  );
};

export default MainRecord;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import useOpenModal from "~/hooks/useOpenModal";

import Modal from "~/components/Modal";

const levelData = [
  {
    key: "level1",
    lv: 1,
    title: "디저트 입문자",
    activated: true,
  },
  {
    key: "level2",
    lv: 2,
    title: "뵤로롱롱",
  },
  {
    key: "level3",
    lv: 3,
    title: "뿅뿅",
  },
  {
    key: "level4",
    lv: 4,
    title: "디저트 러버",
  },
  {
    key: "level5",
    lv: 5,
    title: "디저트 마스터",
  },
];

const MyPage: NextPage = () => {
  const {
    isOpenModal: isOpenLevelModal,
    clickModal: clickLevel,
    closeModal: closeLevel,
  } = useOpenModal();

  const {
    isOpenModal: isOpenProfileUpdate,
    clickModal: clickProfileUpdate,
    closeModal: closeProfileUpdate,
  } = useOpenModal();

  return (
    <>
      <Head>
        <title>달당 - 마이페이지</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border-x-0 border-slate-200 py-[40px] md:border-x">
        <section className="relative mb-8 flex w-full flex-row items-center justify-between px-4">
          <Link href="/">
            <Image
              src="logo/logo_main.svg"
              alt="메인 로고"
              width={50}
              height={50}
            />
          </Link>
          <div className="im-hyemin-b absolute left-0 right-0 -z-[1] text-center text-xl text-[#FFAAA8]">
            나의 기록장
          </div>
        </section>
        <section className="felx-row mb-8 flex w-full items-center justify-start px-4">
          <div className="mr-6 flex h-[118px] w-[118px] items-center justify-center rounded-xl bg-transparent md:mr-[29px]">
            <Image
              src="/profile/profile_pic.png"
              alt="prifile image"
              width={118}
              height={118}
            />
          </div>
          <div className="flex flex-col items-start justify-between">
            <div className="mb-[26px] flex flex-col items-start">
              <span className="mb-[8px] text-[22px] leading-none text-[#222222]">
                닉네임을 정해주세요
              </span>
              <span className="im-hyemin-r flex flex-row items-center text-base text-[#5c5c5c]">
                <button
                  type="button"
                  className="mr-[18px]"
                  onClick={clickLevel}
                >
                  <Image
                    src="/level/lv1.svg"
                    alt="레벨 아이콘"
                    width={23}
                    height={18}
                  />
                </button>
                디저트 입문자
              </span>
            </div>
            <button
              type="button"
              className="im-hyemin-r rounded-lg bg-[#ffaaa8] px-[9px] py-[6px] text-[18px] text-white"
              onClick={clickProfileUpdate}
            >
              프로필 수정하기 &gt;
            </button>
          </div>
        </section>
        <section className="mx-auto mb-[40px] flex w-full max-w-lg flex-col items-start justify-between rounded-t-[50px] bg-[#FCDCC0] px-4 pb-[40px] pt-[40px]">
          <div className="mb-[30px] flex w-full flex-col items-start pb-5">
            <div className="im-hyemin-b mb-5 text-[22px] text-white">
              <span className="text-[#ffaaa8]">나의 기록</span> 모아보기
            </div>
            <div className="grid w-full grid-cols-1 grid-rows-3 gap-y-4">
              <div className="flex w-full flex-row items-center justify-start gap-x-6 border-b border-b-custom-red py-4">
                <div className="h-[50px] w-[50px] rounded-md bg-[#F3CCA9]">
                  <span className="flex h-[50px] w-[50px] items-center justify-center align-middle text-4xl">
                    🍯
                  </span>
                </div>
                <p className="break-keep text-base font-normal text-[#595959]">
                  지금까지 총{" "}
                  <span className="im-hyemin-b mx-0.5 text-lg text-custom-red">
                    50kcal
                  </span>{" "}
                  행복 칼로리 저장했어요.
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-start gap-x-6 border-b border-b-custom-red py-4">
                <div className="h-[50px] w-[50px] rounded-md bg-[#F3CCA9]">
                  <span className="flex h-[50px] w-[50px] items-center justify-center align-middle text-4xl">
                    📑
                  </span>
                </div>
                <p className="break-keep text-base font-normal text-[#595959]">
                  지금까지 총{" "}
                  <span className="im-hyemin-b mx-0.5 text-lg text-custom-red">
                    12가지
                  </span>{" "}
                  기록했어요.
                </p>
              </div>
              <div className="flex w-full flex-row items-center justify-start gap-x-6 border-b border-b-custom-red py-4">
                <div className="h-[50px] w-[50px] rounded-md bg-[#F3CCA9]">
                  <span className="flex h-[50px] w-[50px] items-center justify-center align-middle text-4xl">
                    🍴
                  </span>
                </div>
                <p className="break-keep text-base font-normal text-[#595959]">
                  지금까지{" "}
                  <span className="im-hyemin-b mx-0.5 text-lg text-custom-red">
                    마카롱
                  </span>{" "}
                  에 대한 기록을 가장 많이 했어요.
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="im-hyemin-b pb-5 text-[22px] text-white">
              <span className="text-[#ffaaa8]">행복 칼로리</span> 높은 디저트는?
            </div>
            <div className="grid w-full grid-cols-3 gap-2">
              <div className="flex flex-col items-center text-lg">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.5)] md:h-32 md:w-32">
                  <Image
                    src="/characters/croissant.svg"
                    alt="디저트 그림"
                    width={113}
                    height={62}
                    className="rotate-[30deg]"
                  />
                </div>
                <span className="im-hyemin-r mt-2 text-white">디저트 이름</span>
                <span className="im-hyemin-b text-custom-red">87kcal</span>
              </div>
              <div className="flex flex-col items-center text-lg">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.5)] md:h-32 md:w-32">
                  <Image
                    src="/characters/macaroon.svg"
                    alt="디저트 그림"
                    width={116}
                    height={83}
                  />
                </div>
                <span className="im-hyemin-r mt-2 text-white">디저트 이름</span>
                <span className="im-hyemin-b text-custom-red">87kcal</span>
              </div>
              <div className="flex flex-col items-center text-lg">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.5)] md:h-32 md:w-32">
                  <Image
                    src="/characters/muffin.svg"
                    alt="디저트 그림"
                    width={111}
                    height={95}
                    className="rotate-12"
                  />
                </div>
                <span className="im-hyemin-r mt-2 text-white">디저트 이름</span>
                <span className="im-hyemin-b text-custom-red">87kcal</span>
              </div>
            </div>
          </div>
        </section>
        <div className="im-hyemin-b mx-auto flex w-full flex-row items-center justify-end px-4">
          <button
            type="button"
            className="mr-[21px] rounded-md bg-custom-purple px-[9px] py-[6px] text-white"
          >
            로그아웃
          </button>
          <button
            type="button"
            className="mr-[21px] rounded-md bg-white px-[9px] py-[6px] text-custom-red"
          >
            탈퇴하기
          </button>
        </div>
      </div>
      {isOpenLevelModal && (
        <Modal closeModal={closeLevel}>
          <div className="z-[9999] mx-auto grid max-w-md grid-cols-1 grid-rows-5 gap-4">
            {levelData.map((level) => (
              <div
                key={level.key}
                className={`flex flex-row items-center justify-start rounded-2xl px-[22px] py-[10px] ${
                  level.activated ? "bg-[#FCDCC0]" : "bg-[#EAEAEA]"
                }`}
              >
                <div className="mr-8 flex h-[85px] w-[85px] items-center justify-center rounded-md bg-[#FFF8F1]">
                  <Image
                    src={`/level/lv${level.lv}.svg`}
                    alt="레벨 이미지"
                    width={80}
                    height={65}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="im-hyemin-b text-xl text-[#222222]">
                    {level.title}
                  </span>
                  <span
                    className={`text-base ${
                      level.activated ? "text-custom-red" : "text-[#8B8B8B]"
                    }`}
                  >
                    lv.{level.lv}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {isOpenProfileUpdate && (
        <Modal closeModal={closeProfileUpdate}>
          <div className="z-[9999] mx-auto w-full bg-white p-8">
            <h2 className="im-hyemin-b text-center text-xl text-[#222222]">
              프로필 수정하기
            </h2>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MyPage;

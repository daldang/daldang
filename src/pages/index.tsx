import { useState } from "react";

import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import { getServerSideSessionPropsOrRedirect } from "~/server/auth";

import Calendar from "~/components/Calendar";
import MainRecord from "~/components/MainRecord";

export default function Home({
  sessionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [isWeeklyView, setIsWeeklyView] = useState(true);

  const switchView = () => setIsWeeklyView(!isWeeklyView);

  let { data: desertLogs } = api.desertLog.getAllDesertLogs.useQuery(
    { authorId: sessionData?.user.id || "" },
    { enabled: sessionData?.user !== undefined }
  );
  desertLogs = desertLogs ? desertLogs : [];

  return (
    <>
      <Head>
        <title>달당 - 나만의 디저트 기록 일지</title>
        <meta name="description" content="디저트 기록 서비스 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border-x border-slate-200 px-4 py-[40px]">
        <section className="mb-[22px] flex w-full flex-row items-center justify-between">
          <Link href="/">
            <Image
              src="/logo/logo_main.svg"
              alt="메인 로고"
              width={50}
              height={50}
            />
          </Link>
          <button
            type="button"
            className=""
            onClick={() => void router.push("/mypage")}
          >
            <Image
              src="/logo/logo_mypage.svg"
              alt="마이페이지 로고"
              width={50}
              height={50}
            />
          </button>
        </section>
        <section className="mb-[32px] w-full">
          <a
            href="https://smore.im/quiz/OwsvT5xSgi"
            target="_blank"
            className="flex w-full flex-col items-center justify-center rounded-lg bg-[#FCDCC0] px-[20px] py-3 text-sm text-[#725739]"
          >
            <span className="im-hyemin-b text-2xl tracking-wide">
              디저트 트렌드 테스트
            </span>
            <span className="im-hyemin-r tracking-tighter">
              나는 다양한 디저트를 얼마나 알고 있을까?
            </span>
            <Image
              src="/icons/dessert_shifta.png"
              width={389}
              height={35}
              alt="디저트 모음"
              className="mt-3"
            />
          </a>
        </section>
        <section className="mb-[20px] w-full">
          <Calendar
            isWeeklyView={isWeeklyView}
            switchView={switchView}
            data={desertLogs}
          />
        </section>
        <section className="grid w-full grid-cols-1 gap-y-[20px]">
          {desertLogs &&
            desertLogs.map((log) => <MainRecord key={log.id} data={log} />)}
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getServerSideSessionPropsOrRedirect(context);
}

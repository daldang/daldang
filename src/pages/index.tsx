import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import Calendar from "~/components/Calendar";
import MainRecord from "~/components/MainRecord";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const router = useRouter();

  return (
    <>
      <Head>
        <title>달당 - 나만의 디저트 기록 일지</title>
        <meta name="description" content="디저트 기록 서비스 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border border-slate-300 px-4 py-[40px]">
        <section className="mb-[22px] flex w-full flex-row items-center justify-between">
          <Link href="/">
            <div className="">
              <Image
                src="logo/logo_main.svg"
                alt="메인 로고"
                width={50}
                height={50}
              />
            </div>
          </Link>
          <button
            type="button"
            className=""
            onClick={() => void router.push("/mypage")}
          >
            <Image
              src="logo/logo_mypage.svg"
              alt="마이페이지 로고"
              width={50}
              height={50}
            />
          </button>
        </section>
        <section className="mb-[32px] w-full">
          <button
            type="button"
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
          </button>
        </section>
        <section className="mb-[20px] w-full">
          <Calendar />
        </section>
        <section className="grid w-full grid-cols-1 gap-y-[20px]">
          <MainRecord />
          <MainRecord />
          <MainRecord />
        </section>
        {/* <section className="w-full px-4">
          <p className="text-2xl text-slate-500">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <AuthShowcase />
        </section> */}
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: desertLogs } = api.desertLog.getAllDesertLogs.useQuery(
    { authorId: sessionData?.user.id || "" },
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex w-full flex-col items-center justify-center border border-red-200 p-4">
      <p className="text-center text-2xl text-slate-500">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {desertLogs?.map((log) => (
          <div key={log.id}>{log.content}</div>
        ))}
      </p>
      <button
        className="rounded-full bg-red-100 px-10 py-3 text-slate-500"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

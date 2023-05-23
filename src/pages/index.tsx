import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import Calendar from "~/components/Calendar";

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
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start gap-5 border border-slate-300 p-4">
        <section className="flex w-full flex-row items-center justify-between px-4">
          <Link href="/">
            <div className="bg-amber-200 p-2">로고</div>
          </Link>
          <button
            type="button"
            className="bg-amber-200 p-2"
            onClick={() => void router.push("/mypage")}
          >
            마이페이지
          </button>
        </section>
        <section className="w-full px-4">
          <button
            type="button"
            className="w-full rounded-lg bg-[#f1f1ff] px-2 py-6 text-sm tracking-tighter disabled:opacity-50"
            disabled
          >
            디저트 트렌드 세터 테스트 하러 가실래요?
          </button>
        </section>
        <section className="w-full px-4">
          <Calendar />
        </section>
        <section className="w-full px-4">
          <div className="flex w-full items-center justify-center border border-amber-200 p-4">
            주별/월별 기록 목록
          </div>
        </section>
        <section className="w-full px-4">
          {/* <p className="text-2xl text-slate-500">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p> */}
          <AuthShowcase />
        </section>
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

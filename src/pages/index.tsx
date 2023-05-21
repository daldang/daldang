import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Calendar from "~/components/Calendar";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const router = useRouter();

  return (
    <>
      <Head>
        <title>달당 - 나만의 디저트 기록 일지</title>
        <meta name="description" content="디저트 기록 서비스 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start gap-5 border border-slate-300 p-4">
        <div className="flex w-full flex-row items-center justify-between">
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
        </div>
        <button
          type="button"
          className="w-full bg-slate-500 px-2 py-4 disabled:bg-slate-300 disabled:text-slate-50"
          disabled
        >
          디저트 트렌드세터 테스트 하러 가기
        </button>
        <Calendar />
        <div className="flex h-96 w-full items-center justify-center border border-amber-200 px-2 py-4">
          주별/월별 기록 목록
        </div>
        <div className="flex w-full flex-col items-center gap-2 border-t border-t-slate-500">
          <p className="text-2xl text-slate-500">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <AuthShowcase />
        </div>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-slate-500">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-fullpx-10 bg-red-100 py-3 font-semibold text-slate-500 no-underline"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

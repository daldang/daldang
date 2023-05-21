import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const RecordPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start gap-5 border border-slate-300 p-4">
        <div className="flex w-full flex-row items-center justify-between">
          <Link href="/">
            <div className="bg-amber-200 p-2">로고</div>
          </Link>
          <button type="button" className="bg-amber-200 p-2">
            닫기
          </button>
        </div>
        <div className="flex w-full flex-row items-start justify-start gap-4 border border-amber-200">
          디저트 기록 페이지
        </div>
      </div>
    </>
  );
};

export default RecordPage;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const MyPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>달당 - 마이페이지</title>
        <meta name="description" content="디저트 기록 일지 달당" />
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
            onClick={() => void router.push("/")}
          >
            캘린더로 보기
          </button>
        </div>
        <div className="flex w-full flex-row items-start justify-start gap-4 border border-amber-200">
          <div className="w-3/5 bg-amber-100 p-4 text-center align-middle">
            테스트 결과
            <br />
            캐릭터 선정
          </div>
          <div className="my-auto flex w-full flex-col items-center justify-center gap-y-2">
            <div className="flex w-full flex-row items-center justify-between">
              <p>닉네임</p>
              <button type="button">수정</button>
            </div>
            <div className="w-full text-slate-500">
              디저트 트렌드세터 테스트 결과
            </div>
          </div>
        </div>
        <button
          type="button"
          disabled
          className="w-full bg-slate-500 px-2 py-4 disabled:bg-slate-300 disabled:text-slate-50"
        >
          디저트 트렌드세터 테스트 하러 가기
        </button>
        <button
          type="button"
          className="w-full bg-amber-200 py-4"
          onClick={() => void router.push("/record")}
        >
          이번 주의 기록
        </button>
      </div>
    </>
  );
};

export default MyPage;

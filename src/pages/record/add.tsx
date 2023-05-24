import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  keyDesertName,
  keyDesertSelected,
  useLocalStorage,
} from "~/utils/hook";
import { desertName } from ".";

const RecordAddPage: NextPage = () => {
  const [desertSelected] = useLocalStorage<desertName>(
    keyDesertSelected,
    "croissant"
  );
  const [userDesertName] = useLocalStorage(keyDesertName, "not selected");
  const [desertLog, setDesertLog] = useState("");
  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-5 border border-slate-300 bg-white p-4">
        <header className="flex w-full flex-row items-center justify-between">
          <Link href="/">
            <div className="bg-amber-200 p-2">로고</div>
          </Link>
          <button type="button" className="bg-amber-200 p-2">
            닫기
          </button>
        </header>
        <div className="flex justify-center gap-20">
          <Image
            className="bg-custom-yellow"
            src={`/characters/${desertSelected}.svg`}
            alt={desertSelected}
            width={150}
            height={150}
          />
          <div>
            <div className="text-3xl">{desertSelected}</div>
            <div>some note</div>
          </div>
        </div>
        <textarea
          className="bg-custom-yellow text-center placeholder:text-center"
          cols={40}
          rows={5}
          placeholder="디저트 로그를 입력"
          value={desertLog || ""}
          onChange={(e) => setDesertLog(e.target.value)}
        ></textarea>
        <div className="im-hyemin-b flex w-full justify-center gap-4 border border-amber-200 align-middle text-xl">
          {desertSelected}
        </div>
        <div className="im-hyemin-b flex w-full justify-center gap-4 border border-amber-200 align-middle text-xl">
          {userDesertName ? "" : desertSelected}
        </div>
      </div>
    </>
  );
};

export default RecordAddPage;

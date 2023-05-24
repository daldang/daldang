import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  keyDesertName,
  keyDesertSelected,
  useLocalStorage,
} from "~/utils/hook";
import { desertName } from ".";

const RecordAddPage: NextPage = () => {
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
            src={`/characters/croissant.svg`}
            alt={"croissant"}
            width={150}
            height={150}
          />
        </div>
        <textarea
          className="bg-custom-yellow text-center placeholder:text-center"
          cols={40}
          rows={5}
          placeholder="디저트 로그를 입력"
        ></textarea>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          className="bg-custom-red"
        />
      </div>
    </>
  );
};

export default RecordAddPage;

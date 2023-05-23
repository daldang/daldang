import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RecordPage: NextPage = () => {
  const [desertName, setDesertName] = useState("");

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-5 border border-slate-300 bg-yellowy p-4">
        <header className="flex w-full flex-row items-center justify-between">
          <Link href="/">
            <div className="bg-amber-200 p-2">로고</div>
          </Link>
          <button type="button" className="bg-amber-200 p-2">
            닫기
          </button>
        </header>
        <div className="im-hyemin-b flex w-full flex-row justify-center gap-4 border border-amber-200 align-middle text-xl">
          기록할 디저트를 선택해주세요 !
        </div>
        {/* TODO: 떠다니는 위치를 어떻게 정하지 ..? */}
        <div className="p-10">
          <SelectableDesert name="croissant"></SelectableDesert>
          <SelectableDesert name="eggBread"></SelectableDesert>
          <SelectableDesert name="macaroon"></SelectableDesert>
          <SelectableDesert name="muffin"></SelectableDesert>
        </div>
        <input
          className="im-hyemin-b placeholder h-11 w-full text-center placeholder:text-center"
          placeholder="디저트의 이름을 적어주세요"
          value={desertName}
          onChange={(e) => setDesertName(e.target.value)}
        ></input>
      </div>
    </>
  );
};

export default RecordPage;

type desertName = "croissant" | "eggBread" | "macaroon" | "muffin";

const SelectableDesert = ({ name }: { name: desertName }) => {
  const size = sizeFromDesertName(name);
  return (
    <Image
      src={`/characters/${name}.svg`}
      alt={name}
      width={size.width}
      height={size.height}
    ></Image>
  );
};

const sizeFromDesertName = (name: desertName) => {
  switch (name) {
    case "croissant":
      return { width: 115.28, height: 63.69 };
    case "eggBread":
      return { width: 102.36, height: 68 };
    case "macaroon":
      return { width: 140.16, height: 101 };
    case "muffin":
      return { width: 95.76, height: 82.47 };
  }
};

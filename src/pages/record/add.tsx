import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  keyDesertName,
  keyDesertSelected,
  useLocalStorage,
} from "~/utils/hook";

const RecordPage: NextPage = () => {
  const [desertSelected, setDesertSelected] = useLocalStorage<desertName>(
    keyDesertSelected,
    "croissant"
  );
  const [userDesertName, setUserDesertName] = useLocalStorage(
    keyDesertName,
    "not selected"
  );
  console.log(desertSelected);
  console.log(userDesertName);
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

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDesertLogRequest } from "~/utils/hook";
import { type DesertCharacter } from "~/utils/type";

const RecordPage: NextPage = () => {
  const [request, setRequest] = useDesertLogRequest();
  const handleSelecet = (charSelected: DesertCharacter) => {
    setRequest({ ...request, desertCharacter: charSelected });
  };

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-5 border border-slate-300 bg-custom-yellow p-4">
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
          <DesertCharacterImage
            char="croissant"
            selected={request.desertCharacter}
            handleSelect={handleSelecet}
          ></DesertCharacterImage>
          <DesertCharacterImage
            char="eggBread"
            selected={request.desertCharacter}
            handleSelect={handleSelecet}
          ></DesertCharacterImage>
          <DesertCharacterImage
            char="macaroon"
            selected={request.desertCharacter}
            handleSelect={handleSelecet}
          ></DesertCharacterImage>
          <DesertCharacterImage
            char="muffin"
            selected={request.desertCharacter}
            handleSelect={handleSelecet}
          ></DesertCharacterImage>
        </div>
        <input
          className="im-hyemin-b placeholder h-11 w-full text-center placeholder:text-center"
          placeholder="디저트의 이름을 적어주세요"
          value={request.desertName}
          onChange={(e) =>
            setRequest({ ...request, desertName: e.target.value })
          }
        ></input>
      </div>
    </>
  );
};

export default RecordPage;

const DesertCharacterImage = ({
  char,
  selected,
  handleSelect,
}: {
  char: DesertCharacter;
  selected?: string;
  handleSelect: (char: DesertCharacter) => void;
}) => {
  const size = sizeFromDesertCharacter(char);
  return (
    <button onClick={() => handleSelect(char)} className="appearance-none">
      <Image
        className={selected && char != selected ? "blur-[2px]" : ""}
        src={`/characters/${char}.svg`}
        alt={char}
        width={size.width}
        height={size.height}
      ></Image>
    </button>
  );
};

const sizeFromDesertCharacter = (char: DesertCharacter) => {
  switch (char) {
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

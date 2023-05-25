import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useDesertLogRequest } from "~/utils/hook";
import { arrayDesertCharacter, type DesertCharacter } from "~/utils/type";

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
          {arrayDesertCharacter.map((char) => (
            <DesertCharacterImage
              key={char}
              char={char}
              selected={request.desertCharacter}
              onSelect={handleSelecet}
            ></DesertCharacterImage>
          ))}
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
  onSelect,
}: {
  char: DesertCharacter;
  selected?: string;
  onSelect: (char: DesertCharacter) => void;
}) => {
  const size = sizeFromDesertCharacter(char);
  return (
    <button onClick={() => onSelect(char)} className="appearance-none">
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
      return { width: 134.9, height: 127.45 };
    case "eggBread":
      return { width: 114.48, height: 94.23 };
    case "macaroon":
      return { width: 162.96, height: 125.66 };
    case "muffin":
      return { width: 112.01, height: 104.87 };
    case "canele":
      return { width: 97, height: 68 };
    case "pencake":
      return { width: 108.53, height: 79.58 };
    case "fishBread":
      return { width: 95.76, height: 82.47 };
    case "mochi":
      return { width: 95.76, height: 82.47 };
  }
};

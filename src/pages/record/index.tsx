import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonPrimary } from "~/components/Button";
import { getServerSideSessionPropsOrRedirect } from "~/server/auth";
import { useSessionStorageRequestState } from "~/utils/hook";
import {
  arrayDesertCharacter,
  convertName,
  type DesertCharacter,
} from "~/utils/type";

export default function RecordPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();

  const [request, setRequest] = useSessionStorageRequestState();

  const handleSelecet = (charSelected: DesertCharacter) => {
    setRequest({ ...request, desertCharacter: charSelected });
  };

  const handleNextStep = () => {
    if (request.desertName === "") {
      setRequest({
        ...request,
        desertName: convertName(request.desertCharacter),
      });
    }

    void router.push("/record/add");
  };

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start bg-[#FFFFDB] px-4 py-[40px]">
        <header className="mb-[22px] flex w-full flex-row items-center justify-between">
          <Link href="/">
            <Image
              src="logo/logo_main.svg"
              alt="메인 로고"
              width={50}
              height={50}
            />
          </Link>
          {request.desertCharacter !== "" ? (
            <button
              type="button"
              className="relative h-9 w-9 rounded-full bg-custom-red p-0 text-center text-white"
              onClick={() => setRequest({ ...request, desertCharacter: "" })}
            >
              <span className="absolute left-[9px] top-[9px] inline-block h-[2px] w-[18px] translate-y-[8px] -rotate-45 rounded-[2px] bg-white" />
              <span className="absolute bottom-[9px] right-[9px] inline-block h-[2px] w-[18px] -translate-y-[8px] rotate-45 rounded-[2px] bg-white" />
            </button>
          ) : (
            <button type="button" className="">
              <Image
                src="logo/logo_mypage.svg"
                alt="마이페이지 로고"
                width={50}
                height={50}
              />
            </button>
          )}
        </header>
        <p className="im-hyemin-b mb-6 w-full text-center text-xl text-[#222222]">
          기록할 디저트를 선택해주세요 !
        </p>
        {/* TODO: 떠다니는 위치를 어떻게 정하지 ..? */}
        <div
          className={
            (request.desertCharacter === "" ? "" : "bg-white/70") +
            " flex flex-wrap items-center justify-around p-2"
          }
        >
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
          className="im-hyemin-r mb-8 mt-8 h-11 w-full rounded-md bg-[#F6F6D6] text-center text-[#444444] placeholder:text-center placeholder:text-[#AEAEAE] focus:bg-white focus:outline-none"
          placeholder="디저트의 이름을 적어주세요  ✏️"
          value={request.desertName}
          onChange={(e) =>
            setRequest({ ...request, desertName: e.target.value })
          }
        />
        <div className="im-hyemin-r w-full text-right">
          <ButtonPrimary onClick={handleNextStep}>
            <span className="text-lg text-white">기록하러 가기 &gt;</span>
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
}

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
    <button onClick={() => onSelect(char)}>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getServerSideSessionPropsOrRedirect(context);
}

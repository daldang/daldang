import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useS3Upload } from "next-s3-upload";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import Swal from "sweetalert2";

import { ButtonPrimary } from "~/components/Button";
import { getServerSideSessionPropsOrRedirect } from "~/server/auth";
import { api } from "~/utils/api";
import { useSessionStorageRequestState } from "~/utils/hook";

export default function RecordAddPage({
  sessionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState<File | undefined>();
  const [objectURL, setObjectURL] = useState<string | undefined>();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const [request, setRequest, { removeItem }] = useSessionStorageRequestState();

  useEffect(() => {
    if (request) {
      setRequest({ ...request, score: 50 });
    }
  }, []);

  const trpc = api.desertLog.createDesertLog.useMutation();

  const handleFileChange = (file: File) => {
    setImageFile(file);
    setObjectURL(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!request.content) {
      void Swal.fire({
        icon: "error",
        iconColor: "#FFAAA8",
        title:
          '<p class="im-hyemin-r text-[#222222] text-base md:text-[22px]">디저트 기록을 입력하세요.</p>',
        confirmButtonText: "확인",
        buttonsStyling: false,
        customClass: {
          container: "font-normal",
          confirmButton:
            "rounded-md bg-white text-custom-purple text-custom-purple border border-custom-purple py-[11px] px-[30px]",
        },
      });

      return;
    }

    let image = "";
    if (imageFile) {
      const { url } = await uploadToS3(imageFile);
      image = url;
    }

    trpc.mutate(
      {
        ...request,
        authorId: sessionData?.user.id || "",
        image: image,
      },
      {
        onSuccess(data, variables, context) {
          removeItem();
          void router.push(`/records/${data.id}`);
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border-none border-slate-200 px-4 py-[40px] md:border-x">
        <header className="mb-[22px] flex w-full flex-row items-center justify-between">
          <Link href="/">
            <Image
              src="/logo/logo_main.svg"
              alt="메인 로고"
              width={50}
              height={50}
            />
          </Link>
          <button
            type="button"
            className=""
            onClick={() => void router.push("/mypage")}
          >
            <Image
              src="/logo/logo_mypage.svg"
              alt="마이페이지 로고"
              width={50}
              height={50}
            />
          </button>
        </header>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="mr-5 flex h-[130px] w-[130px] items-center justify-center rounded-md bg-[#FFFFDB] md:h-[150px] md:w-[150px]">
            <Image
              src={`/characters/${request.desertCharacter}.svg`}
              alt="character"
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="im-hyemin-b mb-1 text-2xl text-[#222222]">
              {request.desertName}
            </span>
            <span className="text-sm font-normal text-[#5c5c5c]">
              {format(request.date, "yyyy.MM.dd")}
            </span>
            <div className="mt-3 flex flex-row items-center justify-start">
              <Image
                src="/icons/icon_location.svg"
                alt="장소 및 위치"
                width={23}
                height={27}
              />
              <input
                className="ml-2 py-2 text-sm text-custom-red"
                placeholder="위치를 입력하세요"
                onChange={(e) =>
                  setRequest({ ...request, location: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <textarea
          className="mt-2 w-full border border-slate-100 p-2 text-center text-sm placeholder:align-middle"
          rows={5}
          placeholder="디저트 기록을 작성하세요"
          value={request.content}
          onChange={(e) => setRequest({ ...request, content: e.target.value })}
        />
        <div className="flex w-full flex-row items-center">
          <div className="mt-5 flex w-full flex-col items-start justify-start">
            <p className="mb-3 text-left text-custom-red">행복 칼로리</p>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={50}
              value={request.score}
              onChange={(e) => {
                setRequest({ ...request, score: e.target.valueAsNumber });
              }}
              className="range range-primary range-xs"
            />
            <div className="flex w-full flex-row items-center justify-between text-xl">
              <span>😢</span>
              <span>😄</span>
              <span>😋</span>
            </div>
          </div>
          <div className="ml-3 h-full pt-6 text-sm text-custom-red">
            <span>{request.score}kal</span>
          </div>
        </div>
        {objectURL && (
          <Image src={objectURL} alt="image" width={500} height={500}></Image>
        )}
        <div className="mt-8 flex w-full justify-between">
          <FileInput onChange={handleFileChange} />
          <button
            className="flex h-[40px] w-[40px] items-center justify-center rounded-md bg-[#F5F5F5]"
            onClick={openFileDialog}
          >
            <span className="mb-2 text-4xl">📷</span>
          </button>
          <ButtonPrimary
            onClick={() => {
              void handleSubmit();
            }}
            className="im-hyemin-r rounded-md bg-custom-purple px-2 py-1 text-white"
          >
            완료!
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getServerSideSessionPropsOrRedirect(context);
}

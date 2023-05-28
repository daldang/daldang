import { format } from "date-fns";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonPrimary, ButtonSecondary } from "~/components/Button";
import { getServerSideSessionPropsOrRedirect } from "~/server/auth";
import { api } from "~/utils/api";
import { useSessionStorageRequestState } from "~/utils/hook";

export default function RecordsPage({
  sessionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const record = api.desertLog.getDesertLogById.useQuery({
    id: router.query.id as string,
  }).data;
  const deleteDesertLog = api.desertLog.deleteDesertLog.useMutation();
  const [request, setRequest, { removeItem }] = useSessionStorageRequestState();

  if (!record) {
    return <div>record not found on id {router.query.id}</div>;
  }
  if (!sessionData) {
    return <div> invalid state without session</div>;
  }

  const handleDelete = () => {
    deleteDesertLog.mutate(
      {
        desertLogId: record.id,
        authorId: sessionData.user.id,
      },
      {
        onSuccess() {
          void router.push("/");
        },
      }
    );
  };

  const handleEdit = () => {
    setRequest({ ...record, image: record.image || "" });
    void router.push("/record/add");
  };

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border-none border-slate-200 py-[40px] md:border-x">
        <header className="mb-[22px] flex w-full flex-row items-center justify-between px-4">
          <Link href="/">
            <Image
              src="/logo/logo_main.svg"
              alt="메인 로고"
              width={50}
              height={50}
            />
          </Link>
          <button
            className="flex h-[50px] w-[50px] items-center justify-center rounded-md bg-primary/50 text-2xl"
            onClick={handleDelete}
          >
            🗑️
          </button>
        </header>
        <div className="relative -z-10 flex w-full flex-col items-start justify-start pb-6 pl-12 pr-10">
          <div className="absolute -top-6 left-0 right-0 mx-auto">
            <Image
              width={512}
              height={493}
              src={`/images/record_bg_${record.image ? 2 : 1}.png`}
              alt="background image"
            />
          </div>
          <div className="z-10 mt-6 flex w-full flex-row items-end justify-start">
            <div className="flex h-[130px] w-[130px] items-center justify-center md:h-[150px] md:w-[150px]">
              <Image
                src={`/characters/${record.desertCharacter}.svg`}
                alt={record.desertCharacter}
                width={110}
                height={110}
              />
            </div>
            <div className="ml-5 flex w-full flex-col items-start justify-end pb-3">
              <span className="im-hyemin-b py-1 text-[22px] text-[#222222]">
                {record.desertName}
              </span>
              <span className="text-sm text-custom-red">
                {record.score} kcal
              </span>
              <div className="mb-4 mt-1 h-1 w-full rounded-full bg-primary">
                <div
                  className="h-1 w-full rounded-full bg-[#FF6562]"
                  style={{ width: `${record.score}%` }}
                />
              </div>
            </div>
          </div>
          <div className="z-10 flex w-full flex-row items-end justify-between">
            <div className="flex flex-row items-center text-[#9C9C67]">
              <div className="flex h-8 w-8 items-center justify-center">
                <Image
                  src="/icons/icon_location_sm.svg"
                  alt="장소 및 위치"
                  width={23}
                  height={27}
                />
              </div>
              <span className="ml-2">{record.location}</span>
            </div>
            <span className="im-hyemin-r text-xs">
              {format(record.date, "yy.MM.dd")}
            </span>
          </div>
          <p
            className="im-hyemin-r z-10 mt-3 px-4 text-sm text-[#595959]"
            dangerouslySetInnerHTML={{ __html: record.content }}
          />
          {record.image && (
            <div className="z-10 mt-28 w-full pl-3">
              <Image
                src={record.image}
                alt="image"
                width={500}
                height={350}
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <div
          className={`${
            record.image ? "mt-28" : "mt-20"
          } flex w-full justify-end gap-5 px-4`}
        >
          <ButtonSecondary
            onClick={handleEdit}
            className="im-hyemin-r rounded-md border border-custom-red bg-white px-2 py-1 text-custom-red"
          >
            수정하기
          </ButtonSecondary>
          <Link href={"/"}>
            <ButtonPrimary className="im-hyemin-r rounded-md bg-custom-purple px-2 py-1 text-white">
              저장하기
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getServerSideSessionPropsOrRedirect(context);
}

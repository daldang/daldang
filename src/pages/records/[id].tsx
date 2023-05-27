import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ButtonPrimary, ButtonSecondary } from "~/components/Button";
import { api } from "~/utils/api";

const RecordPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const record = api.desertLog.getDesertLogById.useQuery({
    id: router.query.id as string,
  }).data;
  const deleteDesertLog = api.desertLog.deleteDesertLog.useMutation();

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

  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="im-hyemin-b  mx-auto flex min-h-screen max-w-lg flex-col gap-5 border border-slate-300 bg-white p-4">
        <section className="mb-[22px] flex w-full flex-row items-center justify-between">
          <Link href="/">
            <div className="">
              <Image
                src="/logo/logo_main.svg"
                alt="메인 로고"
                width={50}
                height={50}
              />
            </div>
          </Link>
          <button
            className="h-[50px] w-[50px] rounded-2xl bg-primary/50"
            onClick={handleDelete}
          >
            🗑️
          </button>
        </section>
        <div className="h-80 flex-col justify-start gap-10 bg-[#ffffdb]">
          <div className="flex gap-5">
            <Image
              className=""
              src={`/characters/${record.desertCharacter}.svg`}
              alt={record.desertCharacter}
              width={150}
              height={150}
            />
            <div className="flex w-3/5 flex-col justify-end  p-0">
              <div className="py-1 text-xl">{record.desertName}</div>
              <div className="text-primary">{record.score} kcal</div>
              <div className="mb-4 h-1 w-full rounded-full bg-primary">
                <div
                  className="h-1 w-1/12 rounded-full bg-red-500"
                  style={{ width: `${record.score}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between p-5">
            <div className="text-[#9C9C67]">{record.location}</div>
            <div>{record.date.toDateString().replaceAll("/", ".")}</div>
          </div>
          <div className="p-5">{record.content}</div>
        </div>
        <div className="flex w-full justify-end gap-5">
          <ButtonSecondary>수정하기</ButtonSecondary>
          <ButtonPrimary>저장하기</ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default RecordPage;

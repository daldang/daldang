/* eslint-disable */
import { useState } from "react";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { signOut } from "next-auth/react";
import { useS3Upload } from "next-s3-upload";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Swal from "sweetalert2";

import { api } from "~/utils/api";

import Modal from "~/components/Modal";
import { getServerSideSessionPropsOrRedirect } from "~/server/auth";
import { convertName } from "~/utils/type";

const levelData = [
  {
    key: "level1",
    lv: 1,
    title: "디저트 입문자",
    activated: true,
  },
  {
    key: "level2",
    lv: 2,
    title: "뵤로롱롱",
  },
  {
    key: "level3",
    lv: 3,
    title: "뿅뿅",
  },
  {
    key: "level4",
    lv: 4,
    title: "디저트 러버",
  },
  {
    key: "level5",
    lv: 5,
    title: "디저트 마스터",
  },
];

const NO_PROFILE_IMAGE = "/profile/no_pic.png";
const DEFAULT_PROFILE_IMAGE = "/profile/profile_pic.png";

export default function MyPage({
  sessionData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const { data: desertLogs } = api.desertLog.getAllDesertLogs.useQuery({
    authorId: sessionData.user.id,
  });

  // mutate, query
  const { mutate: updateUser } = api.user.updateUser.useMutation();
  const { mutate: deleteUser } = api.user.delteUser.useMutation();

  const [myInfo, setMyInfo] = useState({
    image: sessionData.user.image || NO_PROFILE_IMAGE,
    name: sessionData.user.name || "",
  });
  const [imageFile, setImageFile] = useState<File | undefined>();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  // 레벨 안내 modal
  const [modalLevel, setModalLevel] = useState(false);

  // get most frequent desert character from desertLogs
  const emptyMap = new Map<string, number>();
  const charToCount: Map<string, number> =
    desertLogs?.reduce((map, current) => {
      map.set(
        current.desertCharacter,
        (map.get(current.desertCharacter) || 0) + 1
      );
      return map;
    }, emptyMap) || emptyMap;
  const frequentChar: string = convertName(
    Array.from(charToCount.keys()).reduce(
      (left, right) =>
        (charToCount.get(left) || 0) > (charToCount.get(right) || 0)
          ? left
          : right,
      ""
    )
  );

  const handleOpenLevel = () => {
    document.body.style.overflow = "hidden";
    setModalLevel(true);
  };
  const handleCloseLevel = () => {
    document.body.style.overflow = "unset";
    setModalLevel(false);
  };

  // 내 정보 수정 modal
  const [modalProfile, setModalProfile] = useState(false);
  const handleOpenProfile = () => {
    document.body.style.overflow = "hidden";
    setModalProfile(true);
  };
  const handleCloseProfile = () => {
    document.body.style.overflow = "unset";
    setModalProfile(false);
  };

  // 프로필 수정하기
  const handleChangeName = (e: any) => {
    const { value: name } = e.target;
    setMyInfo({ ...myInfo, name });
  };

  const handleFileChange = (file: File) => {
    setImageFile(file);
    setMyInfo({ ...myInfo, image: URL.createObjectURL(file) });
  };

  const handleChangeImage = (type: string) => {
    switch (type) {
      case "default":
        setMyInfo({ ...myInfo, image: DEFAULT_PROFILE_IMAGE });
        break;
      case "delete":
        setMyInfo({ ...myInfo, image: NO_PROFILE_IMAGE });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    if (!sessionData) {
      return;
    }

    if (myInfo.name === "") {
      return Swal.fire({
        icon: "error",
        text: "이름은 필수 입력 항목입니다.",
        confirmButtonText: "확인",
        confirmButtonColor: "#e0c2ff",
      });
    }

    let image = "";
    if (imageFile) {
      const { url } = await uploadToS3(imageFile);
      image = url;
    }
    updateUser(
      {
        userid: sessionData.user.id,
        username: myInfo.name,
        profileImage: image || myInfo.image,
      },
      {
        onSuccess(data, variables, context) {
          setMyInfo({
            name: data.name || myInfo.name,
            image: data.image || image,
          });

          // close modal
          handleCloseProfile();

          // refresh <<-- state
          router.reload();
        },
      }
    );
  };

  const handleLogout = () => {
    void Swal.fire({
      title:
        '<span class="im-hyemin-r text-[#222222] text-base md:text-[22px]">로그아웃을 진행할까요?</span>',
      confirmButtonText: "네",
      showCancelButton: true,
      cancelButtonText: "아니오",
      buttonsStyling: false,
      customClass: {
        container: "font-normal",
        confirmButton:
          "rounded-md bg-white text-custom-red text-custom-red border border-custom-red py-[11px] px-[30px] mr-8",
        cancelButton:
          "rounded-md bg-custom-purple text-white py-[11px] px-[30px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        void signOut();
      }
    });
  };

  const handleDeleteAccount = () => {
    void Swal.fire({
      title:
        '<p class="im-hyemin-r text-[#222222] text-base md:text-[22px]">탈퇴 시 모든 계정 정보가 삭제됩니다.<br />탈퇴를 진행할까요?</p>',
      confirmButtonText: "네",
      showCancelButton: true,
      cancelButtonText: "아니오",
      buttonsStyling: false,
      customClass: {
        container: "font-normal",
        confirmButton:
          "rounded-md bg-white text-custom-red text-custom-red border border-custom-red py-[11px] px-[30px] mr-8",
        cancelButton:
          "rounded-md bg-custom-purple text-white py-[11px] px-[30px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(
          { userId: sessionData.user.id },
          {
            onSuccess() {
              router.push("/signin");
            },
          }
        );
      }
    });
  };

  return (
    <>
      <Head>
        <title>달당 - 마이페이지</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border-x-0 border-slate-200 py-[40px] md:border-x">
        <section className="relative mb-8 flex w-full flex-row items-center justify-between px-4">
          <Link href="/">
            <Image
              src="logo/logo_main.svg"
              alt="메인 로고"
              width={50}
              height={50}
            />
          </Link>
          <div className="im-hyemin-b absolute left-0 right-0 -z-[1] text-center text-xl text-[#FFAAA8]">
            나의 기록장
          </div>
        </section>
        <section className="felx-row mb-8 flex w-full items-center justify-start px-4">
          {myInfo.image !== NO_PROFILE_IMAGE ? (
            <div className="mr-6 flex h-[118px] w-[118px] items-center justify-center overflow-hidden rounded-xl bg-transparent md:mr-[29px]">
              <Image
                src={myInfo.image}
                alt="prifile image"
                width={118}
                height={118}
              />
            </div>
          ) : (
            <div className="mr-6 flex h-[118px] w-[118px] flex-col items-center justify-end rounded-xl bg-custom-yellow md:mr-[29px]">
              <Image
                src={myInfo.image}
                width={100}
                height={100}
                alt="프로필 사진 없음"
                className="mx-auto"
              />
            </div>
          )}
          <div className="flex flex-col items-start justify-between">
            <div className="mb-[26px] flex flex-col items-start">
              <span className="mb-[8px] text-xl leading-none text-[#222222] md:text-[22px]">
                {sessionData && sessionData.user
                  ? sessionData.user?.name
                  : "닉네임을 정해주세요"}
              </span>
              <span className="im-hyemin-r flex flex-row items-center text-sm text-[#5c5c5c] md:text-base">
                <button
                  type="button"
                  className="mr-[18px]"
                  onClick={handleOpenLevel}
                >
                  <Image
                    src="/level/lv1.svg"
                    alt="레벨 아이콘"
                    width={23}
                    height={18}
                  />
                </button>
                디저트 입문자
              </span>
            </div>
            <button
              type="button"
              className="im-hyemin-r rounded-lg bg-[#ffaaa8] px-[9px] py-[6px] text-base text-white md:text-[18px]"
              onClick={handleOpenProfile}
            >
              프로필 수정하기 &gt;
            </button>
          </div>
        </section>
        <section className="mx-auto mb-[40px] flex w-full max-w-lg flex-col items-start justify-between rounded-t-[50px] bg-[#FCDCC0] px-4 pb-[40px] pt-[40px]">
          <div className="mb-[30px] flex w-full flex-col items-start pb-5">
            <div className="im-hyemin-b mb-2 text-lg text-white md:text-[22px]">
              <span className="text-[#ffaaa8]">나의 기록</span> 모아보기
            </div>
            {desertLogs && desertLogs.length > 0 ? (
              <div className="grid w-full grid-cols-1 grid-rows-3 gap-y-4">
                <div className="flex w-full flex-row items-center justify-start gap-x-4 border-b border-b-custom-red py-4 md:gap-x-6">
                  <div className="h-[50px] w-[50px] rounded-md bg-[#F3CCA9]">
                    <span className="flex h-[50px] w-[50px] items-center justify-center align-middle text-4xl">
                      🍯
                    </span>
                  </div>
                  <p className="break-keep text-sm font-normal text-[#595959] md:text-base">
                    지금까지 총
                    <span className="im-hyemin-b mx-0.5 text-base text-custom-red md:text-lg">
                      {desertLogs.reduce(
                        (sum, current) => sum + current.score,
                        0
                      )}
                      kcal
                    </span>{" "}
                    의 행복 칼로리를 저장했어요
                  </p>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-x-4 border-b border-b-custom-red py-4 md:gap-x-6">
                  <div className="h-[50px] w-[50px] rounded-md bg-[#F3CCA9]">
                    <span className="flex h-[50px] w-[50px] items-center justify-center align-middle text-4xl">
                      📑
                    </span>
                  </div>
                  <p className="break-keep text-sm font-normal text-[#595959] md:text-base">
                    지금까지 총{" "}
                    <span className="im-hyemin-b mx-0.5 text-base text-custom-red md:text-lg">
                      {desertLogs.length}개
                    </span>{" "}
                    의 디저트를 기록했어요
                  </p>
                </div>
                <div className="flex w-full flex-row items-center justify-start gap-x-4 border-b border-b-custom-red py-4 md:gap-x-6">
                  <div className="h-[50px] w-[50px] rounded-md bg-[#F3CCA9]">
                    <span className="flex h-[50px] w-[50px] items-center justify-center align-middle text-4xl">
                      🍴
                    </span>
                  </div>
                  <p className="break-keep text-sm font-normal text-[#595959] md:text-base">
                    지금까지{" "}
                    <span className="im-hyemin-b mx-0.5 text-base text-custom-red md:text-lg">
                      {frequentChar}
                    </span>{" "}
                    에 대한 기록이 가장 많아요
                  </p>
                </div>
              </div>
            ) : (
              <p className="flex w-full flex-row items-center justify-center pb-6 pt-10 font-light text-[#5d5d5d]">
                디저트 기록이 없어요 :(
              </p>
            )}
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="im-hyemin-b pb-5 text-lg text-white md:text-[22px]">
              <span className="text-[#ffaaa8]">행복 칼로리</span> 높은 디저트는?
            </div>
            <div className="grid w-full grid-cols-3 gap-2">
              {desertLogs && desertLogs.length > 0 ? (
                desertLogs
                  .sort((left, right) => right.score - left.score)
                  .map((log) => (
                    <Link key={log.id} href={`/records/${log.id}`}>
                      <div className="flex flex-col items-center text-lg">
                        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.5)] md:h-32 md:w-32">
                          <Image
                            src={`/characters/${log.desertCharacter}.svg`}
                            alt="디저트 그림"
                            width={113}
                            height={62}
                            className="rotate-[30deg]"
                          />
                        </div>
                        <span className="im-hyemin-b mt-2 text-sm text-white md:text-base">
                          {log.desertName}
                        </span>
                        <span className="im-hyemin-b text-base text-custom-red md:text-lg">
                          {log.score.toString()}kcal
                        </span>
                      </div>
                    </Link>
                  ))
              ) : (
                <p className="flex w-full flex-row items-center justify-center pb-10 pt-6 font-light text-[#5d5d5d]">
                  디저트 기록이 없어요 :(
                </p>
              )}
            </div>
          </div>
        </section>
        <div className="im-hyemin-b mx-auto flex w-full flex-row items-center justify-end px-4">
          <button
            type="button"
            className="mr-[21px] rounded-md bg-custom-purple px-[9px] py-[6px] text-white"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button
            type="button"
            className="mr-[21px] rounded-md bg-white px-[9px] py-[6px] text-custom-red"
            onClick={handleDeleteAccount}
          >
            탈퇴하기
          </button>
        </div>
      </div>
      <Modal open={modalLevel} onClose={handleCloseLevel}>
        <div className="mx-auto grid w-4/5 grid-cols-1 grid-rows-5 gap-4">
          {levelData.map((level) => (
            <div
              key={level.key}
              className={`flex flex-row items-center justify-start rounded-2xl px-[22px] py-[10px] ${
                level.activated ? "bg-[#FCDCC0]" : "bg-[#EAEAEA]"
              }`}
            >
              <div className="mr-8 flex h-[85px] w-[85px] items-center justify-center rounded-md bg-[#FFF8F1]">
                <Image
                  src={`/level/lv${level.lv}.svg`}
                  alt="레벨 이미지"
                  width={80}
                  height={65}
                />
              </div>
              <div className="flex flex-col">
                <span className="im-hyemin-b text-xl text-[#222222]">
                  {level.title}
                </span>
                <span
                  className={`text-base ${
                    level.activated ? "text-custom-red" : "text-[#8B8B8B]"
                  }`}
                >
                  lv.{level.lv}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal open={modalProfile} onClose={handleCloseProfile}>
        <div className="mx-auto w-full bg-white px-4 py-6 md:p-8">
          <h2 className="im-hyemin-b mb-5 text-center text-xl text-[#222222]">
            프로필 수정하기
          </h2>
          {myInfo.image !== NO_PROFILE_IMAGE ? (
            <div className="mx-auto mb-6 flex h-[150px] w-[150px] flex-col items-center justify-center overflow-hidden rounded-xl bg-custom-yellow">
              <Image
                src={myInfo.image}
                width={150}
                height={150}
                alt="프로필 사진 있음"
                className="mx-auto"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div className="mx-auto mb-6 flex h-[150px] w-[150px] flex-col items-center justify-end rounded-xl bg-custom-yellow">
              <Image
                src={myInfo.image}
                width={130}
                height={130}
                alt="프로필 사진 없음"
                className="mx-auto"
              />
            </div>
          )}
          <div className="im-hyemin-r mx-auto mb-8 flex w-full flex-row items-center justify-around">
            <button
              type="button"
              onClick={openFileDialog}
              className="rounded-md bg-custom-purple px-[9px] py-[6px] text-white"
            >
              파일 업로드
            </button>
            <FileInput className="hidden" onChange={handleFileChange} />
            <button
              type="button"
              onClick={(e) => handleChangeImage("default")}
              className="rounded-md bg-custom-red px-[9px] py-[6px] text-white"
            >
              기본 캐릭터로 변경
            </button>
            <button
              type="button"
              onClick={(e) => handleChangeImage("delete")}
              className="rounded-md border border-custom-red px-[9px] py-[6px] text-custom-red"
            >
              삭제하기
            </button>
          </div>
          <input
            type="text"
            placeholder="닉네임을 적어주세요  ✏️"
            value={myInfo.name}
            onChange={handleChangeName}
            className="im-hyemin-r mb-7 block w-full rounded-md border border-custom-red py-[10px] text-center text-[#222222] focus:outline-none"
          />
          <div className="im-hyemin-r mx-auto grid w-fit grid-cols-2 gap-x-10">
            <button
              type="button"
              className="rounded-md border border-custom-red px-[9px] py-[6px] text-custom-red"
              onClick={handleCloseProfile}
            >
              취소
            </button>
            <button
              type="button"
              className="rounded-md bg-custom-purple px-[9px] py-[6px] text-white"
              onClick={handleSubmit}
            >
              적용하기
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getServerSideSessionPropsOrRedirect(context);
}

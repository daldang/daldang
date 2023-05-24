import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const RecordAddPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>달당 - 디저트 기록하기</title>
        <meta name="description" content="디저트 기록 일지 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="im-hyemin-b  mx-auto flex min-h-screen max-w-lg flex-col gap-5 border border-slate-300 bg-white p-4">
        <header className="flex w-full flex-row items-center justify-between">
          <Link href="/">
            <div className="bg-amber-200 p-2">로고</div>
          </Link>
          <button type="button" className="bg-amber-200 p-2">
            닫기
          </button>
        </header>
        <div className="flex justify-start gap-10">
          <Image
            className="bg-secondary"
            src={`/characters/croissant.svg`}
            alt={"croissant"}
            width={150}
            height={150}
          />
          <div className="flex-col bg-slate-50">
            <div className="py-1 text-2xl">디저트 이름</div>
            <time className="py-1 text-center">2023.05.21</time>
            <div className="flex py-1">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.7903 6.09052C12.3242 1.55664 19.6751 1.55664 24.209 6.09052C28.7428 10.6244 28.7428 17.9753 24.209 22.5092L22.6263 24.0744C21.4598 25.2192 19.9463 26.6912 18.0851 28.4905C16.9222 29.6151 15.0771 29.6149 13.9143 28.4903L9.25946 23.9624C8.67445 23.388 8.18476 22.9036 7.7903 22.5092C3.25642 17.9753 3.25642 10.6244 7.7903 6.09052ZM22.7947 7.50473C19.0419 3.75189 12.9573 3.75189 9.20452 7.50473C5.45168 11.2576 5.45168 17.3421 9.20452 21.0949L11.1873 23.0516C12.2792 24.1201 13.6518 25.454 15.3047 27.0527C15.6923 27.4275 16.3072 27.4276 16.695 27.0528L21.2215 22.6508C21.8467 22.0371 22.3712 21.5184 22.7947 21.0949C26.5475 17.3421 26.5475 11.2576 22.7947 7.50473ZM15.9996 10.6647C18.2099 10.6647 20.0016 12.4565 20.0016 14.6668C20.0016 16.8771 18.2099 18.6688 15.9996 18.6688C13.7894 18.6688 11.9976 16.8771 11.9976 14.6668C11.9976 12.4565 13.7894 10.6647 15.9996 10.6647ZM15.9996 12.6647C14.8939 12.6647 13.9975 13.5611 13.9975 14.6668C13.9975 15.7725 14.8939 16.6688 15.9996 16.6688C17.1054 16.6688 18.0016 15.7725 18.0016 14.6668C18.0016 13.5611 17.1054 12.6647 15.9996 12.6647Z"
                  fill="#FF6562"
                />
              </svg>
              <div className="p-1 text-center text-primary">
                서울 특별시 합정동
              </div>
            </div>
          </div>
        </div>
        <textarea
          className="bg-custom-yellow text-center placeholder:text-center"
          cols={40}
          rows={4}
          placeholder="디저트 로그를 입력"
          defaultValue={`가나다라마바사 아자차카타파하 왕 맛있다 
          맛평가를 해주세요 맛평가를 해주세요! 맛평가를 해주세요 !?
          바닐라 마카롱은 근본이지 근본 이즈 베스트 짱 !`}
        ></textarea>
        <div className="text text-primary">행복 칼로리</div>
        <input
          type="range"
          min={0}
          max={100}
          defaultValue={50}
          className="range range-primary"
        />
        <div className="flex w-full justify-between text-3xl">
          <span>😢</span>
          <span>😄</span>
          <span>😋</span>
        </div>
        <div className="flex w-full justify-between">
          <button className="pl-5 text-4xl">📷</button>
          <button className="btn-accent btn text-white">저장하기</button>
        </div>
      </div>
    </>
  );
};

export default RecordAddPage;

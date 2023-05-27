import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn, type ClientSafeProvider } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

import signinImg from "../../public/images/signin.png";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>달당 - 나만의 디저트 기록 일지</title>
        <meta name="description" content="디저트 기록 서비스 달당" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-between border-x-0 border-slate-200 pt-10 md:border-x">
        <div className="mx-4 flex flex-row items-center justify-center gap-5 md:gap-10">
          <div className="h-[120px] w-[120px] md:h-[150px] md:w-[150px]">
            <Image
              src="/logo/logo_signin.svg"
              alt="logo"
              width={150}
              height={150}
            />
          </div>
          <p className="im-hyemin-r break-keep py-10 text-sm md:text-base">
            빵과 디저트를 좋아하는 당신을 위한,
            <br />
            잊지 못할 인생 맛집을 기억하기 위해,
            <br />
            <strong className="im-hyemin-b">달당</strong>에 당신의 디저트를
            기록해주세요.
          </p>
        </div>
        <div className="relative mt-8 h-full w-full max-w-lg rounded-t-[120px] bg-[#fefec0] pb-20">
          <div className="absolute -top-6 left-0 right-0 z-10 w-full">
            <Image src={signinImg} alt="sign in page deco image" />
          </div>
          <div className="flex flex-col pt-[200px] text-center">
            {Object.values(providers)
              .filter((provider) => provider.id != "naver")
              .map((provider) => (
                <AuthButton key={provider.id} provider={provider} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

const AuthButton = ({ provider }: { provider: ClientSafeProvider }) => {
  const imageFromProvider = (p: ClientSafeProvider) => {
    if (p.id == "naver") {
      return "/images/signin/naver/white.png";
    }
    if (p.id == "kakao") {
      return "/images/signin/kakao/medium-narrow.png";
    }
    if (p.id == "google") {
      return "/images/signin/google/light-normal-2x.png";
    }
    return "";
  };
  return (
    <div>
      <button onClick={() => void signIn(provider.id)}>
        <Image
          src={imageFromProvider(provider)}
          alt="login-button"
          width={282}
          height={57}
        />
      </button>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

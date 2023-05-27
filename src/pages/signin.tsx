import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn, type ClientSafeProvider } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

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
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-start border-x border-slate-200 px-4 py-[40px]">
        <div className="flex justify-center gap-10">
          <Image
            src="/logo/logo_signin.svg"
            alt="logo"
            width={150}
            height={150}
          ></Image>
          <text className="im-hyemin-r py-10">
            빵과 디저트를 좋아하는 당신을 위한,
            <br />
            잊지 못할 인생 맛집을 기억하기 위해,
            <br />
            <strong className="im-hyemin-b">달당</strong>에 당신의 디저트를
            기록해주세요.
          </text>
        </div>
        <div className="my-8 h-[476px] w-[512px] bg-[url('/images/signin/background.png')] bg-no-repeat">
          <div className="flex-col pt-[250px] text-center">
            {Object.values(providers)
              .filter((provider) => provider.id != "naver")
              .map((provider) => (
                <AuthButton key={provider.id} provider={provider}></AuthButton>
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
        ></Image>
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

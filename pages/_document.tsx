import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta
          name="description"
          content="개발자와 디자이너 등 다양한 색을 가진 각 분야의 전문가들이 모여 더 멋진 앞날을 꿈꾸는 곳입니다."
        />
        <meta property="og:title" content="사이드 퀘스트" />
        <meta
          property="og:description"
          content="개발자와 디자이너 등 다양한 색을 가진 각 분야의 전문가들이 모여 더 멋진 앞날을 꿈꾸는 곳입니다."
        />
        <meta property="og:image" content="/images/logo.svg" />
        <meta property="og:url" content="https://sidequest.co.kr/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="사이드 퀘스트" />
        <meta
          name="twitter:description"
          content="개발자와 디자이너 등 다양한 색을 가진 각 분야의 전문가들이 모여 더 멋진 앞날을 꿈꾸는 곳입니다."
        />
        <meta name="twitter:image" content="/images/logo.svg" />
        <link rel="canonical" href="https://sidequest.co.kr/" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

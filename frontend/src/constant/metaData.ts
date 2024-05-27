import { Metadata } from 'next';

interface MetadataProps {
  [key: string]: string;
}

export const META = {
  title: 'Why 커뮤니티 | 궁금함으로 가득찬',
  siteName: 'why community',
  description: '살다 보면 떠올리는 궁금한 이야기.',
  keyword: ['커뮤니티', '미스테리'],
  url: 'https://why-chat-fe.shop',
  googleVerification: process.env.GOOGLE || '',
  naverVerification: process.env.NAVER || '',
  ogImage: '/main.png',
} as const;

export const getMetadata = (metadataProps?: MetadataProps) => {
  const { title, description, asPath } = metadataProps || {};

  const TITLE = title ? `${title} | Why 커뮤니티` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? META.url + asPath : META.url;
  const OG_IMAGE = META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    verification: {
      google: META.googleVerification,
      other: {
        'naver-site-verification': META.naverVerification,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
  };

  return metadata;
};

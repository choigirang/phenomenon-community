import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getMetadata } from '@/constant/metaData';

/** add notice page meta */
export const generateMetadata = async (): Promise<Metadata> => {
  return getMetadata({
    title: `공지사항 추가`,
    asPath: `/notice/add`,
  });
};

const Writer = dynamic(() => import('@/app/(common)/(aboutContent)/(content)/writer'), {
  ssr: false,
});

/** 2024/05/22 - add notice writer page */
export default async function Page() {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lightBlue font-bold border-b-4 border-blue">공지사항 작성</h2>
      <Writer btnName="작성하기" notice />
    </section>
  );
}

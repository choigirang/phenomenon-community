import dynamic from 'next/dynamic';

const Writer = dynamic(() => import('@/app/(common)/(aboutContent)/(content)/writer'), {
  ssr: false,
});

export default async function Page() {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lightBlue font-bold border-b-4 border-blue">공지사항 작성</h2>
      <Writer btnName="작성하기" notice />
    </section>
  );
}

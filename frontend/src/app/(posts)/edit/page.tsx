import { SearchParams } from '@/type/common';
import { api } from '@/util/api';
import { PostType } from '@/type/community/type';
import dynamic from 'next/dynamic';

export const Writer = dynamic(() => import('./writer'), {
  ssr: false,
});

async function getPostData(postNum: string) {
  try {
    const res = await api.get(`/post/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page(page: SearchParams) {
  const num = page.searchParams.num;
  const data: PostType = await getPostData(num);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lightBlue font-bold border-b-4 border-blue">게시글 수정</h2>
      <div className="flex justify-between">
        <input value={data.title} disabled className="text-black/30" />
      </div>
      <Writer {...data} />
    </section>
  );
}

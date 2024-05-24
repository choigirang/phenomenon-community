import dynamic from 'next/dynamic';
import { api } from '@/util/api';

import { PostType } from '@/type/community/type';
import { SearchParams } from '@/type/common';

const Writer = dynamic(() => import('@/app/(common)/(aboutContent)/(content)/writer'), {
  ssr: false,
});

// add each post data for edit
async function getPostData(postNum: string) {
  try {
    const res = await api.get(`/post/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

/** 2024/05/17 - each post edit page */
export default async function Page(page: SearchParams) {
  const num = page.searchParams.num;
  const data: PostType = await getPostData(num);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lightBlue font-bold border-b-4 border-blue">게시글 수정</h2>
      <input value={data.title} disabled className="text-black/30" />
      <Writer data={data} />
    </section>
  );
}

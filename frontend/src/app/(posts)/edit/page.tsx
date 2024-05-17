import { SearchParams } from '@/type/common';
import { api } from '@/util/api';
import Writer from './writer';
import { PostType } from '@/type/community/type';

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
    <section className="flex flex-col">
      <h2>게시글 수정</h2>
      <Writer htmlStr={data.body} />
    </section>
  );
}

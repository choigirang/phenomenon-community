import Link from 'next/link';
import List from './list';
import { api } from '@/util/api';

import { PostType } from '@/type/community/type';

// get latest post data
async function getLatestPost() {
  const res = await api.get('/posts/latest');
  return res.data;
}

/** 2024/05/16 - latest post in home page */
export default async function PrePosts() {
  const data: PostType[] = await getLatestPost();

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between text-xs border-b-2 pb-2 border-dashed">
        <span>최근 게시물</span>
        <Link href={'/posts'}>더 보기</Link>
      </div>
      <ul className="flex flex-col gap-2">
        {data.map(list => (
          <List key={list.title} {...list} />
        ))}
      </ul>
    </section>
  );
}

import { api } from '@/util/api';
import Category from '../category';
import { PostType } from '@/type/community/type';
import List from '../list';
import Link from 'next/link';

async function getAllPosts(page: string) {
  const res = await api.get(`/posts?category=all&page=${page}`);
  return res.data;
}

export default async function Page({ params: { page } }: { params: { page: string } }) {
  const { posts, totalPost } = await getAllPosts(page);

  console.log(posts);

  return (
    <div className="flex flex-col gap-2">
      <Category />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs border-b-2 pb-2 border-dashed">
          <span>전체 게시물</span>
        </div>
        <ul className="flex flex-col gap-2">
          {posts.map((list: PostType) => (
            <List key={list.title} {...list} />
          ))}
        </ul>
        <ul>
          <Link href={'/community?category=all&page=2'}>2</Link>
        </ul>
      </div>
    </div>
  );
}

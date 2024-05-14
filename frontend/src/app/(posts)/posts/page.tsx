import { api } from '@/util/api';
import Category from '../category';
import Lists from '../lists';
import Pagination from '../pagination';
import { GetServerSidePropsContext } from 'next';

export async function getAllPosts(page: string) {
  try {
    const res = await api.get(`/posts?category=all&page=${page}`);
    return res.data;
  } catch (err) {
    return console.log(`check ${err}`);
  }
}

export default async function Page(context: GetServerSidePropsContext) {
  // const { posts, totalPosts } = await getAllPosts(page);
  const { posts, totalPosts } = await getAllPosts(context.searchParams.page);

  return (
    <div className="flex flex-col gap-2">
      <Category />
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs border-b-2 pb-2 border-dashed">
          <span>전체 게시물</span>
        </div>
        <Lists posts={posts} />
        <Pagination data={posts} totalPosts={totalPosts} />
      </div>
    </div>
  );
}

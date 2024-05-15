import { api } from '@/util/api';
import Category from '../category';
import Lists from '../lists';
import Pagination from '../pagination';

interface URLProps {
  params: {};
  searchParams: { [key: string]: string };
}

export async function getAllPosts(page?: string, category?: string, search?: string) {
  try {
    // const API = search ? `/posts?category=${category}&page=${page}` : `/search?keyword=${search}`;
    const API = `/posts?category=${category}&page=${page}`;
    const res = await api.get(API);
    return res.data;
  } catch (err) {
    return console.log(`check ${err}`);
  }
}

export default async function Page(props: URLProps) {
  const pageParam = props.searchParams.page;
  const categoryParam = props.searchParams.category;
  const { posts, totalPosts } = await getAllPosts(pageParam, categoryParam);
  console.log(props, categoryParam, pageParam);

  return (
    <div className="flex flex-col gap-2">
      <Category />
      <div className="flex flex-col gap-2">
        <p className="text-xs border-b border-dashed border-darkBlue pb-default">전체 게시물</p>
        {posts.length ? <Lists posts={posts} /> : <div className="flex justify-center">작성된 게시글이 없습니다.</div>}
        {totalPosts !== 0 && <Pagination totalPosts={totalPosts} />}
      </div>
    </div>
  );
}

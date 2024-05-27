import { api } from '@/util/api';
import Category from '../category';
import List from '../list';
import Pagination from '@/app/(common)/pagination';
import Search from '@/app/(common)/(aboutContent)/(content)/search';

import { PostType } from '@/type/community/type';
import { SearchParams } from '@/type/common';
import { Metadata } from 'next';
import { getMetadata } from '@/constant/metaData';
import { CATEGORY } from '@/constant/constant';

/** posts page meta */
export const generateMetadata = async (props: SearchParams): Promise<Metadata> => {
  const path = props.searchParams.page;
  const pageParam = props.searchParams.page;
  const categoryParam = props.searchParams.category;
  const keyword = props.searchParams.keyword;

  function title() {
    const category = Object.entries(CATEGORY).find(([key, val]) => val === categoryParam)?.[0];

    if (keyword) return `${keyword}`;
    else if (category) return `${category} 게시글`;
    else if (pageParam) return `${pageParam} 페이지`;
    else return `게시글`;
  }

  return getMetadata({
    title: title(),
    asPath: `/posts?page=${path}`,
  });
};

// get all post data
export async function getAllPosts(page: string = '1', category: string = 'all', search?: string) {
  // divide search keyword or category api
  try {
    const API = search ? `/posts/search?page=${page}&keyword=${search}` : `/posts?category=${category}&page=${page}`;
    const res = await api.get(API);
    return res.data;
  } catch (err) {
    return console.log(`check ${err}`);
  }
}

/** 2024/05/23 - all post page(page,search keyword,category) */
export default async function Page(props: SearchParams) {
  const pageParam = props.searchParams.page;
  const categoryParam = props.searchParams.category;
  const keyword = props.searchParams.keyword;
  const { posts, totalPosts } = await getAllPosts(pageParam, categoryParam, keyword);

  return (
    <div className="flex flex-col gap-2">
      <Category />
      <div className="flex flex-col gap-2">
        <p className="text-xs border-b border-dashed border-darkBlue pb-default">전체 게시물</p>
        {/* post list */}
        {posts && posts.length ? (
          <ul className="flex flex-col gap-2">
            {posts.map((list: PostType) => (
              <List key={list.title} {...list} />
            ))}
          </ul>
        ) : (
          <div className="flex justify-center">작성된 게시글이 없습니다.</div>
        )}
        {totalPosts !== 0 && <Pagination src={'posts'} total={totalPosts} />}
        <Search src="posts" placeholder="검색할 게시글의 제목을 입력하세요." />
      </div>
    </div>
  );
}

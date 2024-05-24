import React from 'react';
import Link from 'next/link';
import PostList from '../(posts)/list';
import { api } from '@/util/api';

import { PostType } from '@/type/community/type';

// fetch search post data
async function getPostData(keyword: string) {
  try {
    const res = await api.get(`/posts/search?keyword=${keyword}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

/** 2024/05/24 - get search post data */
export default async function PostData({ keyword }: { keyword: string }) {
  const { posts, totalPosts } = await getPostData(keyword);

  return (
    <React.Fragment>
      <div className="flex justify-between border-b-4 border-blue">
        <h2 className="text-lightBlue font-bold">갤러리</h2>
        {totalPosts >= 10 && <Link href={`/posts?keyword=${keyword}`}>더 보기</Link>}
      </div>
      <ul className={`flex flex-col ${posts.length === 0 && 'justify-center items-center'} min-h-[200px]`}>
        {posts.length !== 0 ? (
          posts.map((post: PostType) => <PostList {...post} key={post.postNumber} />)
        ) : (
          <li className="text-xs">작성된 갤러리가 없습니다.</li>
        )}
      </ul>
    </React.Fragment>
  );
}

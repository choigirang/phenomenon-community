import { Metadata } from 'next';
import { api } from '@/util/api';
import Title from '@/app/(common)/(aboutContent)/(content)/title';
import Edit from '../../../(common)/(aboutContent)/(content)/edit';
import Content from '../../../(common)/(aboutContent)/(content)/content';
import Like from '../../../(common)/(aboutContent)/(content)/like';
import Comment from '@/app/(common)/(aboutContent)/(comment)/comments';
import { getMetadata } from '@/constant/metaData';

import { SearchParams } from '@/type/common';
import { PostType } from '@/type/community/type';

/** posts edit page meta */
export const generateMetadata = async (page: SearchParams): Promise<Metadata> => {
  const post = page.params.post;
  const data: PostType = await getPostData(post[0]);

  return getMetadata({
    title: `${data.title}`,
    asPath: `/posts/${post}`,
  });
};

// get each post data
async function getPostData(postNum: string) {
  try {
    const res = await api.get(`/post/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

/** 2024/05/17 - each post page */
export default async function Page(page: SearchParams) {
  const post = page.params.post;
  const data: PostType = await getPostData(post[0]);

  return (
    <section className="flex flex-col gap-4 p-container">
      {/* author & title */}
      <Title data={data} src="게시글">
        <Edit src="post" num={data.postNumber} author={data.author} />
      </Title>
      {/* post content */}
      <Content body={data.body} />
      {/* likes */}
      <div className="flex justify-center">
        <Like {...data} />
      </div>
      {/* comments */}
      <div className="flex gap-1 text-xs">
        <h3 className="font-bold">전체 댓글</h3>
        <span className="text-red">{data.comments.length}</span>
      </div>
      <Comment src="post" data={data} comment={data.comments} />
    </section>
  );
}

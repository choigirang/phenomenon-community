import { PostType } from '@/type/community/type';
import { api } from '@/util/api';
import Content from '../../../(common)/(aboutContent)/(content)/content';
import Like from '../../../(common)/(aboutContent)/(content)/like';
import Comment from '@/app/(common)/(aboutContent)/(comment)/comments';
import Edit from '../../../(common)/(aboutContent)/(content)/edit';
import { SearchParams } from '@/type/common';
import Title from '@/app/(common)/(aboutContent)/(content)/title';

async function getPostData(postNum: string) {
  try {
    const res = await api.get(`/post/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page(page: SearchParams) {
  const post = page.params.post;
  const data: PostType = await getPostData(post[0]);

  return (
    <section className="flex flex-col gap-4 p-container">
      {/* 작성자 & 타이틀 */}
      <Title data={data} src="게시글">
        <Edit src="post" num={data.postNumber} author={data.author} />
      </Title>
      {/* 글 내용 */}
      <Content body={data.body} />
      {/* 추천수 */}
      <div className="flex justify-center">
        <Like {...data} />
      </div>
      {/* 댓글 */}
      <div className="flex gap-1 text-xs">
        <h3 className="font-bold">전체 댓글</h3>
        <span className="text-red">{data.comments.length}</span>
      </div>
      <Comment src="post" data={data} comment={data.comments} />
    </section>
  );
}

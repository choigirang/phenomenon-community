import { PostType } from '@/type/community/type';
import { api } from '@/util/api';
import Content from './content';
import Like from './like';
import Comment from '@/app/(common)/(comment)/comment';
import AddComment from '@/app/(common)/(comment)/addComment';

async function getPostData(postNum: string) {
  try {
    const res = await api.get(`/post/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page({ params: { post } }: { params: { post: string[] } }) {
  const data: PostType = await getPostData(post[0]);

  return (
    <section className="flex flex-col gap-4 p-container">
      <h2 className="text-lg text-blue border-b-4 border-darkBlue font-bold">게시글</h2>
      {/* 작성자 정보 */}
      <div className="flex flex-col border-b">
        <h2 className="font-bold py-default">{data.title}</h2>
        <div className="flex justify-between gap-3 text-xs py-default">
          <div className="flex gap-3">
            <h3>{data.author}</h3>
            <span>|</span>
            <h3>{data.date}</h3>
          </div>
          <div className="flex gap-3">
            <span>조회 : {data.views}</span>
            <span>스크랩 : {data.likes.length}</span>
          </div>
        </div>
      </div>
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
      {data.comments.map(each => (
        <Comment data={each} key={each.commentNumber} />
      ))}
      {/* 댓글 작성 */}
      <AddComment />
    </section>
  );
}

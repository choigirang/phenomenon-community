import { api } from '@/util/api';

async function getPostData(postNum: string) {
  try {
    const res = await api.get(`/post/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page({ params: { post } }: { params: { post: string[] } }) {
  const data = await getPostData(post[0]);

  return (
    <main className="p-container">
      <h2 className="text-lg text-blue border-b-4 border-darkBlue">게시글</h2>
    </main>
  );
}

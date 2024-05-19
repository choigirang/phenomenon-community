import { SearchParams } from '@/type/common';
import { GalleryType } from '@/type/gallery/type';
import { api } from '@/util/api';

async function getGalleryData(postNum: string) {
  try {
    const res = await api.get(`/gallery/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page(page: SearchParams) {
  const gallery = page.params.gallery;
  const data: GalleryType = await getGalleryData(gallery[0]);

  return (
    <section className="flex flex-col gap-4 p-container">
      <h2 className="text-lg text-blue border-b-4 border-darkBlue font-bold">게시글</h2>
      {/* 작성자 정보 */}
      <div className="flex flex-col border-b">
        <div className="flex justify-between">
          <h2 className="font-bold py-default">{data.title}</h2>
          {/* <Edit postNumber={data.postNumber} author={data.author} /> */}
        </div>
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
    </section>
  );
}

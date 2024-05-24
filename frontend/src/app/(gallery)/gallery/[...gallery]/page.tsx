import Comment from '@/app/(common)/(aboutContent)/(comment)/comments';
import Title from '@/app/(common)/(aboutContent)/(content)/title';
import Edit from '@/app/(common)/(aboutContent)/(content)/edit';
import Like from '@/app/(common)/(aboutContent)/(content)/like';
import { GALLERY_URL, URL } from '@/constant/constant';
import { SearchParams } from '@/type/common';
import { GalleryType } from '@/type/gallery/type';
import { api } from '@/util/api';
import Image from 'next/image';

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
      {/* 작성자 & 타이틀 */}
      <Title data={data} src="갤러리">
        <Edit src="gallery" num={data.galleryNumber} author={data.author} />
      </Title>
      {/* 이미지 */}
      <ul className="flex flex-col gap-2">
        {data.images.map(img => (
          <li className="relative flex justify-center" key={img.src}>
            <Image
              src={GALLERY_URL(img.src)}
              alt="content img"
              fill
              className="!relative max-w-[90%] max-h-[90%] w-auto h-auto"
              priority
            />
          </li>
        ))}
      </ul>
      {/* 추천수 */}
      <div className="flex justify-center">
        <Like {...data} />
      </div>
      {/* 댓글 */}
      <div className="flex gap-1 text-xs">
        <h3 className="font-bold">전체 댓글</h3>
        <span className="text-red">{data.comments.length}</span>
      </div>
      <Comment src="gallery" data={data} comment={data.comments} />
    </section>
  );
}

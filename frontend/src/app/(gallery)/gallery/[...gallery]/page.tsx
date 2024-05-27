import Image from 'next/image';
import Comment from '@/app/(common)/(aboutContent)/(comment)/comments';
import Title from '@/app/(common)/(aboutContent)/(content)/title';
import Edit from '@/app/(common)/(aboutContent)/(content)/edit';
import Like from '@/app/(common)/(aboutContent)/(content)/like';
import { api } from '@/util/api';
import { GALLERY_URL } from '@/constant/constant';

import { SearchParams } from '@/type/common';
import { GalleryType } from '@/type/gallery/type';
import { getMetadata } from '@/constant/metaData';
import { Metadata } from 'next';

/** each gallery page meta */
export const generateMetadata = async (props: SearchParams): Promise<Metadata> => {
  const gallery = props.params.gallery[0];
  const data: GalleryType = await getGalleryData(gallery);

  return getMetadata({
    title: `${data.title}`,
    asPath: `/gallery/${data.galleryNumber}`,
  });
};

// get gallery data
async function getGalleryData(postNum: string) {
  try {
    const res = await api.get(`/gallery/${postNum}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

/** 2024/05/19 - each gallery post page */
export default async function Page(page: SearchParams) {
  // gallery number
  const gallery = page.params.gallery;
  const data: GalleryType = await getGalleryData(gallery[0]);

  return (
    <section className="flex flex-col gap-4 p-container">
      {/* author & title */}
      <Title data={data} src="갤러리">
        <Edit src="gallery" num={data.galleryNumber} author={data.author} />
      </Title>
      {/* uploaded img */}
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
      {/* likes */}
      <div className="flex justify-center">
        <Like {...data} />
      </div>
      {/* comments */}
      <div className="flex gap-1 text-xs">
        <h3 className="font-bold">전체 댓글</h3>
        <span className="text-red">{data.comments.length}</span>
      </div>
      <Comment src="gallery" data={data} comment={data.comments} />
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import GalleryList from '../(gallery)/list';
import { api } from '@/util/api';

import { GalleryType } from '@/type/gallery/type';

// fetch search gallery data
async function getGalleryData(keyword: string) {
  try {
    const res = await api.get(`/gallery?keyword=${keyword}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// style by gallery data
const st = {
  grid: 'grid grid-cols-5',
  flex: 'flex flex-col justify-center items-center',
};

/** 2024/05/24 - get search gallery data */
export default async function GalleryData({ keyword }: { keyword: string }) {
  const { gallery, totalGallery } = await getGalleryData(keyword);

  return (
    <React.Fragment>
      <div className="flex justify-between border-b-4 border-blue">
        <h2 className="text-lightBlue font-bold">갤러리</h2>
        {totalGallery >= 10 && <Link href={`/gallery?keyword=${keyword}`}>더 보기</Link>}
      </div>
      <ul className={`${gallery.length === 0 ? st.flex : st.grid} min-h-[200px]`}>
        {gallery.length !== 0 ? (
          gallery.map((data: GalleryType) => <GalleryList {...data} key={data.galleryNumber} />)
        ) : (
          <li className="text-xs">작성된 갤러리가 없습니다.</li>
        )}
      </ul>
    </React.Fragment>
  );
}

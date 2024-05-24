import Link from 'next/link';
import List from './list';
import { api } from '@/util/api';

import { GalleryType } from '@/type/gallery/type';

// get latest gallery posts
async function getLatestGallery() {
  const res = await api.get('/gallery/latest');
  return res.data;
}

/** 2024/05/10 - latest gallery data in home */
export default async function PreGallery() {
  const data: GalleryType[] = await getLatestGallery();

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between text-xs border-b-2 pb-2 border-dashed">
        <span>최근 갤러리</span>
        <Link href={'/gallery'}>더 보기</Link>
      </div>
      <ul className="grid grid-cols-preGallery aspect-auto gap-3">
        {data.map(list => (
          <List key={list.title} {...list}></List>
        ))}
      </ul>
    </section>
  );
}

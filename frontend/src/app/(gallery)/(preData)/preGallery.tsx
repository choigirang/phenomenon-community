import { GalleryType } from '@/src/type/gallery/type';
import { api } from '@/src/util/api';
import Link from 'next/link';
import List from './list';

async function getLatestGallery() {
  const res = await api.get('/gallery/latest');
  return res.data;
}

export default async function PreGallery() {
  const data: GalleryType[] = await getLatestGallery();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs border-b-2 pb-2 border-dashed">
        <span>최근 갤러리</span>
        <Link href={'/gallery'}>더 보기</Link>
      </div>
      <ul className="grid grid-cols-preGallery aspect-auto gap-3">
        {data.map(list => (
          <List key={list.title} {...list}></List>
        ))}
      </ul>
    </div>
  );
}

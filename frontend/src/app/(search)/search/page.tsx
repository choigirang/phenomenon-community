import PostList from '@/app/(posts)/list';
import GalleryList from '@/app/(gallery)/list';
import { SearchParams } from '@/type/common';
import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';
import { api } from '@/util/api';
import Link from 'next/link';

interface DATA {
  searchPostResults: PostType[];
  searchGalleryResults: GalleryType[];
}

async function getData(keyword: string) {
  try {
    const res = await api.get(`/search?keyword=${keyword}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

const st = {
  grid: 'grid grid-cols-5',
  flex: 'flex flex-col justify-center items-center',
};

export default async function Page(props: SearchParams) {
  const keyword = props.searchParams.keyword;
  const { searchPostResults: pData, searchGalleryResults: gData }: DATA = await getData(keyword);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between border-b-4 border-blue">
        <h2 className="text-lightBlue font-bold">갤러리</h2>
        {gData.length >= 10 && <span>더 보기</span>}
      </div>
      <ul className={`${gData.length === 0 ? st.flex : st.grid} min-h-[200px]`}>
        {gData.length !== 0 ? (
          gData.map(gallery => <GalleryList {...gallery} />)
        ) : (
          <li className="text-xs">작성된 갤러리가 없습니다.</li>
        )}
      </ul>
      <div className="flex justify-between border-b-4 border-blue">
        <h2 className="text-lightBlue font-bold">게시글</h2>
        {pData.length >= 10 && <Link href={'/posts/'}>더 보기</Link>}
      </div>
      <ul className={`flex flex-col ${pData.length === 0 && 'justify-center items-center'} min-h-[200px]`}>
        {pData.length !== 0 ? (
          pData.map(post => <PostList {...post} />)
        ) : (
          <li className="text-xs">작성된 갤러리가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

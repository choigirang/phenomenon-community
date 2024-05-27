import List from '../list';
import Search from '@/app/(common)/(aboutContent)/(content)/search';
import Pagination from '@/app/(common)/pagination';
import { api } from '@/util/api';

import { SearchParams } from '@/type/common';
import { GalleryType } from '@/type/gallery/type';
import { getMetadata } from '@/constant/metaData';
import { Metadata } from 'next';

/** gallery page meta */
export const generateMetadata = async (props: SearchParams): Promise<Metadata> => {
  const pageParam = props.searchParams.page;
  const keyword = props.searchParams.keyword;

  function title() {
    if (keyword) return `${keyword}`;
    else if (pageParam) return `${pageParam} 페이지`;
    else return '갤러리';
  }

  return getMetadata({
    title: title(),
    asPath: `/gallery/page=${pageParam}`,
  });
};

// get all gallery posts data
export async function getAllPosts(page: string = '1', search?: string) {
  // if keyword && find data with keyword
  try {
    const API = search ? `/gallery?keyword=${search}` : `/gallery?page=${page}`;
    const res = await api.get(API);
    return res.data;
  } catch (err) {
    return console.log(`check ${err}`);
  }
}

/** 2024/05/10 - all gallery posts page */
export default async function Page(props: SearchParams) {
  const pageParam = props.searchParams.page;
  const keyword = props.searchParams.keyword;

  const { gallery, totalGallery } = await getAllPosts(pageParam, keyword);
  return (
    <section>
      <ul className="grid grid-cols-preGallery aspect-auto gap-3">
        {gallery && gallery.length ? (
          gallery.map((data: GalleryType) => <List key={data.galleryNumber} {...data} />)
        ) : (
          <div className="flex justify-center">작성된 게시글이 없습니다.</div>
        )}
      </ul>
      <Pagination src={'gallery'} total={totalGallery} />
      <Search src="gallery" placeholder="검색할 게시글의 제목을 입력하세요." />
    </section>
  );
}

import { GalleryType } from '@/type/gallery/type';
import { api } from '@/util/api';
import List from '../list';
import Pagination from '@/app/(common)/pagination';
import { SearchParams } from '@/type/common';
import Search from '@/app/(common)/(aboutContent)/(content)/search';

export async function getAllPosts(page: string = '1', search?: string) {
  try {
    const API = search ? `/gallery?keyword=${search}` : `/gallery?page=${page}`;
    const res = await api.get(API);
    return res.data;
  } catch (err) {
    return console.log(`check ${err}`);
  }
}

export default async function Page(props: SearchParams) {
  const pageParam = props.searchParams.page;
  const keyword = props.searchParams.keyword;

  const { gallery, totalGallery } = await getAllPosts(pageParam, keyword);
  return (
    <section>
      <ul className="grid grid-cols-preGallery aspect-auto gap-3">
        {gallery.length ? (
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

import { GalleryType } from '@/type/gallery/type';
import { api } from '@/util/api';
import List from '../list';
import Pagination from '@/app/(common)/pagination';
import { SearchParams } from '@/type/common';

export async function getAllPosts(page?: string, category: string = 'all', search?: string) {
  try {
    // const API = search ? `/posts?category=${category}&page=${page}` : `/search?keyword=${search}`;
    const API = `/gallery?page=${page}`;
    const res = await api.get(API);
    return res.data;
  } catch (err) {
    return console.log(`check ${err}`);
  }
}

export default async function Page(props: SearchParams) {
  const pageParam = props.searchParams.page;

  const { gallery, totalGallery } = await getAllPosts(pageParam);
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
    </section>
  );
}

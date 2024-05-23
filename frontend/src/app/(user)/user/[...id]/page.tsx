import GalleryList from '@/app/(gallery)/list';
import PostList from '@/app/(posts)/list';
import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';
import { UserType } from '@/type/user/type';
import { api } from '@/util/api';

async function getUser(user: string) {
  try {
    const res = await api.get(`/user?id=${user}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { userPosts, userGallery, userInfo } = await getUser(id[0]);
  const user: UserType = userInfo;
  const posts: PostType[] = userPosts;
  const gallery: GalleryType[] = userGallery;

  return (
    <div className="flex flex-col gap-4">
      <div>
        {/* 정보 */}
        <h2 className="flex gap-4 items-center text-lg text-blue font-bold">
          <span>{user.id}</span>
          <span className="text-sm text-lightBlue font-medium">{user.name}</span>
        </h2>
      </div>
      <h2 className="flex gap-4 items-center text-lg text-blue border-b-4 border-darkBlue font-bold">게시글</h2>
      <ul className="flex flex-col gap-2">
        {posts.length !== 0 ? (
          posts.map(list => <PostList key={list.title} {...list} />)
        ) : (
          <li>작성된 게시글이 없습니다.</li>
        )}
      </ul>
      <h2 className="flex gap-4 items-center text-lg text-blue border-b-4 border-darkBlue font-bold">갤러리</h2>
      <ul className="grid grid-cols-preGallery aspect-auto gap-3">
        {gallery.length !== 0 ? (
          gallery.map(list => <GalleryList key={list.title} {...list} />)
        ) : (
          <li>작성된 갤러리가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

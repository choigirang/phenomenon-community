import { PostType } from '@/type/community/type';
import List from './list';

export default function Lists({ posts }: { posts: PostType[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {posts.map((list: PostType) => (
        <List key={list.title} {...list} />
      ))}
    </ul>
  );
}

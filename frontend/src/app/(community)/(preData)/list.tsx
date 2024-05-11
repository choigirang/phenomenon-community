import { PostType } from '@/src/type/community/type';
import {
  CalendarDaysIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  HeartIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';

const titleAuthor = {
  title: {
    icon: undefined,
  },
  author: {
    icon: UsersIcon,
  },
};

const info = {
  date: {
    icon: CalendarDaysIcon,
  },
  view: {
    icon: EyeIcon,
  },
  likes: {
    icon: HeartIcon,
  },
  commnet: {
    icon: ChatBubbleOvalLeftEllipsisIcon,
  },
};

export default function List(data: PostType) {
  return (
    <li className="w-full flex justify-between text-xs">
      <div className="flex gap-4">
        {Object.entries(titleAuthor).map(([key, { icon: Icon }]) => (
          <span key={key} className="flex items-center gap-1">
            {Icon && <Icon width={12} height={12} color="gray" />}
            {data[key]}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <span className="flex items-center gap-1">
          <CalendarDaysIcon width={12} height={12} color="gray" />
          {data.date}
        </span>
        <span className="flex items-center gap-1">
          <EyeIcon width={12} height={12} color="gray"></EyeIcon>
          {data.views}
        </span>
        <span className="flex items-center gap-1">
          <HeartIcon width={12} height={12} color="gray" />
          {data.likes.length}
        </span>
        <span className="flex items-center gap-1">
          <ChatBubbleOvalLeftEllipsisIcon width={12} height={12} color="gray" />
          {data.comments.length}
        </span>
      </div>
    </li>
  );
}

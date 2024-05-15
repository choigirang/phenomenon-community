import { PostType } from '@/type/community/type';
import {
  CalendarDaysIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  HeartIcon,
  UsersIcon,
} from '@heroicons/react/16/solid';
import React from 'react';
import Link from 'next/link';

interface ICON {
  [key: string]: React.ReactNode;
}

const icon: ICON = {
  title: undefined,
  author: <UsersIcon width={12} height={12} className="text-stone-400" />,
  date: <CalendarDaysIcon width={12} height={12} className="text-stone-400" />,
  views: <EyeIcon width={12} height={12} className="text-stone-400" />,
  likes: <HeartIcon width={12} height={12} className="text-rose-300" />,
  comments: <ChatBubbleOvalLeftEllipsisIcon width={12} height={12} className="text-black/60" />,
};

const st = {
  li: 'flex justify-end items-center gap-1 hover:text-lightBlue',
};

export default function List(data: PostType) {
  if (!data) return <div>서버 오류입니다.</div>;

  return (
    <li className="w-full">
      <Link className="flex justify-between text-xs" href={`/posts/${data.postNumber}`}>
        {/* post info*/}
        <ul className="w-full grid grid-cols-prePosts gap-5 place-content-between">
          {Object.entries(icon).map(([key, ICON]) => {
            if (key === 'title') return <li key={key} className="hover:text-lightBlue">{`${data[key]}`}</li>;
            else
              return (
                <li key={key} className={st.li}>
                  {ICON} {`${Array.isArray(data[key]) ? (data[key] as any[]).length : data[key]}`}
                </li>
              );
          })}
        </ul>
      </Link>
    </li>
  );
}

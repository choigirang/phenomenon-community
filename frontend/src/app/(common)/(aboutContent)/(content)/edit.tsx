'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/hooks/useRedux';
import { api } from '@/util/api';

import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

interface Props {
  src: string | undefined;
  num: number;
  author: string;
}

/** 2024/05/22 - edit or delete btn */
export default function Edit(props: Props) {
  // check user
  const user = useAppSelector(state => state.loginSlice);

  const router = useRouter();

  // delete post func
  const deletePost = () => {
    const result = confirm('게시글을 삭제하시겠습니까?');
    if (result === true) {
      api.delete(`/${props.src}/${props.num}`).then(() => {
        alert('게시글이 삭제되었습니다.');
        router.replace('/');
      });
    }
  };

  return (
    <React.Fragment>
      {/* if user === post.author && (delete & edit post) */}
      {props.author === user.id && (
        <div className="flex gap-2">
          {/* edit */}
          {props.src !== 'gallery' && (
            <Link href={`/posts/edit?num=${props.num}`} className="flex items-center">
              <PencilIcon width={16} height={16} />
            </Link>
          )}
          {/* delete */}
          <button type="button" onClick={deletePost} name="delete post button">
            <TrashIcon width={16} height={16} />
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

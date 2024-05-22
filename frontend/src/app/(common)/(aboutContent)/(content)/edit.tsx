'use client';

import { useAppSelector } from '@/hooks/useRedux';
import { api } from '@/util/api';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  src: string | undefined;
  num: number;
  author: string;
}

export default function Edit(props: Props) {
  const user = useAppSelector(state => state.loginSlice);

  const deletePost = () => {
    const result = confirm('게시글을 삭제하시겠습니까?');
    if (result === true) {
      api.delete(`/${props.src}/${props.num}`).then(() => {
        alert('게시글이 삭제되었습니다.');
        useRouter().replace('/');
      });
    }
  };

  return (
    <React.Fragment>
      {props.author === user.id && (
        <div className="flex gap-2">
          {props.src !== 'gallery' && (
            <Link href={`/posts/edit?num=${props.num}`} className="flex items-center">
              <PencilIcon width={16} height={16} />
            </Link>
          )}
          <button type="button" onClick={deletePost} name="delete post button">
            <TrashIcon width={16} height={16} />
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

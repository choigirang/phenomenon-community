import { useAppSelector } from '@/hooks/useRedux';
import { CommentData } from '@/type/common';
import { TrashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

interface CommentProps {
  data: CommentData;
  deleteComment: (comment: CommentData) => void;
}

export default function Comment({ data, deleteComment }: CommentProps) {
  const user = useAppSelector(state => state.loginSlice);

  return (
    <ul
      className="grid grid-cols-comment items-center text-xs pt-default border-t border-gray"
      key={data.commentNumber}>
      {/* 작성자 & 댓글 추가 */}
      <li className="flex gap-4">
        <h2 className="font-semibold">{data.author}</h2>
      </li>
      {/* 댓글 */}
      <li className="w-full text-wrap">{data.comment}</li>
      {/* 날짜 */}
      <li className="text-right text-gray">{data.date}</li>
      {/* 댓글 삭제 */}
      {user.id === data.author && (
        <li onClick={() => deleteComment(data)} className="text-lightGray hover:text-gray cursor-pointer">
          <TrashIcon width={12} height={12} />
        </li>
      )}
    </ul>
  );
}

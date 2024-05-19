'use client';

import { CommentData } from '@/type/common';
import React, { useState } from 'react';
import AddComment from './addComment';
import { PostType } from '@/type/community/type';

interface CommentProps {
  data: PostType;
  comment: CommentData[];
}

export default function Comment({ data, comment }: CommentProps) {
  const [comments, setComments] = useState<CommentData[] | []>(comment);

  return (
    <React.Fragment>
      {/* 댓글 목록 */}
      {comments.length === 0 && <div>작성된 댓글이 없습니다.</div>}

      {comments.map(each => (
        <ul className="grid grid-cols-comment text-xs pt-default border-t border-gray" key={each.commentNumber}>
          <li className="flex gap-4">
            <h2 className="font-semibold">{each.author}</h2>
            <span>{each.comment}</span>
          </li>
          <li className="text-right text-gray">{each.date}</li>
        </ul>
      ))}
      {/* 댓글 추가 */}
      <AddComment setComments={setComments} data={data} />
    </React.Fragment>
  );
}

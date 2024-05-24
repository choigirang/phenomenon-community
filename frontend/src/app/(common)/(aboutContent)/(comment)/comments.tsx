'use client';

import { CommentData } from '@/type/common';
import React, { useState } from 'react';
import AddComment from './addComment';
import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';
import { api } from '@/util/api';
import Comment from './comment';

interface CommentProps {
  data: PostType | GalleryType;
  comment: CommentData[];
  src: string;
}

function isPostType(data: PostType | GalleryType): data is PostType {
  return (data as PostType).postNumber !== undefined;
}

export default function Comments({ data, src, comment }: CommentProps) {
  const [comments, setComments] = useState<CommentData[] | []>(comment);

  const deleteComment = (comment: CommentData) => {
    api
      .delete(`/${src}/${isPostType(data) ? data.postNumber : data.galleryNumber}/comments/${comment.commentNumber}`)
      .then(() => {
        alert('댓글이 삭제되었습니다.');
        setComments(prev => prev.filter(each => each.commentNumber !== comment.commentNumber));
      })
      .catch(() => alert('서버 에러입니다.'));
  };

  return (
    <React.Fragment>
      {/* 댓글 목록 */}
      {comments.length === 0 && <div>작성된 댓글이 없습니다.</div>}

      {comments.map(each => (
        <Comment key={each.commentNumber} data={each} deleteComment={deleteComment}></Comment>
      ))}
      {/* 댓글 추가 */}
      <AddComment setComments={setComments} data={data} />
    </React.Fragment>
  );
}

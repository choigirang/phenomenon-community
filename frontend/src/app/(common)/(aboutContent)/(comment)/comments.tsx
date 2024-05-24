'use client';

import React, { useState } from 'react';
import Comment from './comment';
import AddComment from './addComment';
import { api } from '@/util/api';

import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';
import { CommentData } from '@/type/common';

interface CommentProps {
  data: PostType | GalleryType;
  comment: CommentData[];
  src: string;
}

/** type guard - post or gallery */
function isPostType(data: PostType | GalleryType): data is PostType {
  return (data as PostType).postNumber !== undefined;
}

/** 2024/05/24 - each post comments data(mapping comment) */
export default function Comments({ data, src, comment }: CommentProps) {
  // set init comments data for mutate(ssr)
  const [comments, setComments] = useState<CommentData[] | []>(comment);

  // delete comment func
  const deleteComment = (comment: CommentData) => {
    // check whit type guard & change api
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
      {/* comments list */}
      {comments.length === 0 && <div>작성된 댓글이 없습니다.</div>}
      {/* mapping commnet */}
      {comments.map(each => (
        <Comment key={each.commentNumber} data={each} deleteComment={deleteComment}></Comment>
      ))}
      {/* add comment*/}
      <AddComment setComments={setComments} data={data} />
    </React.Fragment>
  );
}

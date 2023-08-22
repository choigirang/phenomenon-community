import { CommentType } from '@/types/type';
import React from 'react';

export default function UserCommentData({ comment }: { comment: CommentType }) {
  return <div>UserCommentData</div>;
}

// author: data.author, comment : data.comment
// {...data} 위랑 샘샘
// {data} : {data: CommentType}

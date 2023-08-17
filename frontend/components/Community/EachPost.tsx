import { EachPostProps, PostType } from '@/types/type';
import React from 'react';
import { AiFillEye, AiFillLike, AiOutlineComment } from 'react-icons/ai';
import styled from 'styled-components';

export default function EachPost(props: EachPostProps) {
  const { postNumber, author, title, body, date, views, likes, comments } = props.posts;

  return (
    <Post href={`/community/post/${postNumber}`}>
      <p className="post-num">{postNumber}</p>
      <p className="title">{title}</p>
      <p className="author">{author}</p>
      <div className="info">
        <p className="date">{date}</p>
        <div>
          <AiFillEye />
          <p className="views">{views}</p>
        </div>
        <div>
          <AiFillLike />
          <p className="likes">{likes}</p>
        </div>
        <div>
          <AiOutlineComment />
          <p className="views">{comments.length}</p>
        </div>
      </div>
    </Post>
  );
}

const Post = styled.a`
  width: 100%;
  height: 20px;
  display: flex;
  padding: var(--padding-text);
  font-size: var(--size-text);
  position: relative;

  div {
    display: flex;
    align-items: center;
    vertical-align: middle;
    margin: 0 var(--margin-small);
    gap: 4px;
  }

  .post-num {
    font-weight: 500;
    color: var(--color-blue);
    padding-right: var(--padding-solo);
  }

  .title {
    width: 50%;
    font-weight: 500;
  }

  .info {
    display: flex;
    position: absolute;
    right: 0;
    margin: 0 !important;
  }
`;
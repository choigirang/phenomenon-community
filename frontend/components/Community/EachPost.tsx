import { EachPostProps, PostType } from '@/types/type';
import Link from 'next/link';
import React from 'react';
import { AiFillEye, AiFillLike, AiOutlineComment } from 'react-icons/ai';
import styled from 'styled-components';

/** 홈 화면 시 개별 게시글 목록 */
export default function EachPost({ item }: { item: PostType }) {
  const { postNumber, author, name, title, body, date, views, likes, comments } = item;

  return (
    <Post href={`/community/post/${postNumber}`}>
      <p className="title">{title}</p>
      <p className="author">{name}</p>
      <div className="info">
        <p className="date">{date}</p>
        <div className="view-box">
          <AiFillEye />
          <p className="views">{views}</p>
        </div>
        <div className="like-box">
          <AiFillLike />
          <p className="likes">{likes}</p>
        </div>
        <div className="comment-box">
          <AiOutlineComment />
          <p className="comment">{comments.length}</p>
        </div>
      </div>
    </Post>
  );
}

const Post = styled(Link)`
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
    width: 250px;
    display: flex;
    position: absolute;
    right: 0;
    margin: 0 !important;

    .view-box {
      position: absolute;
      left: 80px;
    }

    .like-box {
      position: absolute;
      left: 140px;
    }

    .comment-box {
      position: absolute;
      left: 200px;
    }
  }
`;

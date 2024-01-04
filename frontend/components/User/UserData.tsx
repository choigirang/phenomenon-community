import React, { useEffect, useState } from 'react';

import { UserDataLogType } from '@/types/type';
import UserPostData from './UserPostData';
import UserCommentData from './UserCommentData';
import UserLikes from './UserLikes';
import Pagination from '../Common/Pagenation';

import styled from 'styled-components';

/**
 *
 * @param data 유저가 작성한 게시글, 갤러리, 댓글 등의 모든 데이터
 * @returns my page에서 유저의 전체 데이터(작성 데이터)를 받아 페이지네이션
 */
export default function UserData({ data }: { data: UserDataLogType }) {
  // 페이지당 보여질 갯수
  const [perPage, setPerPage] = useState(3);

  // 페이지
  const [postCurtPage, setPostCurtPage] = useState(1);
  const [postPageCount, setPostPageCount] = useState(0);

  const [commentCurtPage, setCommentCurtPage] = useState(1);
  const [commentPageCount, setCommentPageCount] = useState(0);

  const [likesCurtPage, setLikesCurtPage] = useState(1);
  const [likesPageCount, setLikesPageCount] = useState(0);

  const { userInfo } = data;
  // 작성한 게시글
  const postsData = data.userPosts;
  // 작성한 댓글
  const commentsData = data.userAllComments;
  // 좋아요 누른
  const likes = userInfo.likes;

  useEffect(() => {
    if (postsData) {
      const pageCount = Math.ceil(postsData.length / perPage);
      setPostPageCount(pageCount);
    }

    if (commentsData) {
      const pageCount = Math.ceil(commentsData.length / perPage);
      setCommentPageCount(pageCount);
    }

    if (likes) {
      const pageCount = Math.ceil(likes.length / perPage);
      setLikesPageCount(pageCount);
    }
  }, [postsData, perPage]);

  // 현재 페이지의 게시글 가져오기
  const getCurrentPagePosts = () => {
    if (postsData) {
      const startIndex = (postCurtPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      return postsData.slice(startIndex, endIndex);
    }
    return [];
  };

  // 현재 페이지의 댓글 가져오기
  const getCurrentPageComments = () => {
    if (commentsData) {
      const startIndx = (commentCurtPage - 1) * perPage;
      const endIndx = startIndx + perPage;
      return commentsData.slice(startIndx, endIndx);
    }

    return [];
  };

  // 현재 페이지의 좋아요 가져오기
  const getCurrentPageLikes = () => {
    if (likes) {
      const startIndex = (likesCurtPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      return likes.slice(startIndex, endIndex);
    }

    return [];
  };

  // 각 섹션의 페이지네이션 처리 함수
  const handlePostPageCount = (selectedItem: { selected: number }) => {
    setPostCurtPage(selectedItem.selected + 1);
  };

  const handleCommentPageCount = (selectedItem: { selected: number }) => {
    setCommentCurtPage(selectedItem.selected + 1);
  };

  const handleLikesPageCount = (selectedItem: { selected: number }) => {
    setLikesCurtPage(selectedItem.selected + 1);
  };
  return (
    <Container>
      <List>
        {/* 게시글 */}
        <p className="sub-title">내가 작성한 글</p>
        {getCurrentPagePosts().map(post => (
          <UserPostData key={post.postNumber} post={post} />
        ))}
        <Pagination pageCount={postPageCount} onPageChange={handlePostPageCount} />
      </List>
      <List>
        {/* 댓글 */}
        <p className="sub-title">내가 작성한 댓글</p>
        {getCurrentPageComments().map((comment, idx) => (
          <UserCommentData key={idx} {...comment}></UserCommentData>
        ))}
        <Pagination pageCount={commentPageCount} onPageChange={handleCommentPageCount} />
      </List>
      <List>
        {/* 좋아요 */}
        <p className="sub-title">좋아요 누른 글</p>
        {getCurrentPageLikes().map((like, idx) => (
          <UserLikes key={idx} {...like}></UserLikes>
        ))}
        <Pagination pageCount={likesPageCount} onPageChange={handleLikesPageCount} />
      </List>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: solid 1px var(--color-dark-gray);
  border-radius: 5px;
  background-color: var(--color-dark-white);
  padding: var(--padding-side);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .sub-title {
    font-size: var(--size-sub-title);
    font-weight: 500;
  }
`;

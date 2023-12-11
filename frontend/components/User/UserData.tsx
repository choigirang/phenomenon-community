import { Comment, CommentType, PostType, User, UserDataLogType } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPostData from './UserPostData';
import UserCommentData from './UserCommentData';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import UserLikes from './UserLikes';
import Pagination from '../Common/Pagenation';
import { useUserData } from '@/hooks/user/useUserData';

export default function UserData({ data }: { data: UserDataLogType }) {
  const [postsData, setPostsData] = useState<PostType[]>();
  const [postCurtPage, setPostCurtPage] = useState(1);
  const [postPageCount, setPostPageCount] = useState(0);

  const [commentsData, setCommentsData] = useState<Comment[]>();
  const [commentCurtPage, setCommentCurtPage] = useState(1);
  const [commentPageCount, setCommentPageCount] = useState(0);

  const [likesCurPage, setLikesCurPage] = useState(1);
  const [likesPageCount, setLikesPageCount] = useState(0);

  const { userInfo } = data;
  const id = userInfo.id;
  const likes = userInfo.likes;
  console.log(data, likes);

  const { data: postData } = useUserData('posts', postCurtPage, id);
  const { data: commentData } = useUserData('comments', commentCurtPage, id);
  const { data: likesData } = useUserData('likes', likesCurPage, id);

  const handlePostPageCount = () => {};

  const handleCommentPageCount = () => {};

  const handleLikesPageCount = () => {};

  return (
    <Container>
      <List>
        <p className="sub-title">내가 작성한 글</p>
        {postsData && postsData.map(post => <UserPostData key={post.postNumber} post={post} />)}
        <Pagination pageCount={postPageCount} onPageChange={handlePostPageCount} />
      </List>
      <List>
        <p className="sub-title">내가 작성한 댓글</p>
        {commentsData && commentsData.map((comment, idx) => <UserCommentData key={idx} {...comment} />)}
        <Pagination pageCount={commentPageCount} onPageChange={handleCommentPageCount} />
      </List>
      <List>
        <p className="sub-title">좋아요 누른 글</p>
        {likes && likes.map(user => <UserLikes key={user.postNumber} {...user} />)}
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

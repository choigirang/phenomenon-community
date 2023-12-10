import { Comment, CommentType, PostType, User } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPostData from './UserPostData';
import UserCommentData from './UserCommentData';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import UserLikes from './UserLikes';
import Pagination from '../Common/Pagenation';
import { useUserData } from '@/hooks/post/useUserData';

export default function UserData({ data }: { data: User }) {
  const [postsData, setPostsData] = useState<PostType[]>();
  const [commentsData, setCommentsData] = useState<Comment[]>();
  const { id } = data;
  const [postCurtPage, setPostCurtPage] = useState(1);
  const [commentCurtPage, setCommentCurtPage] = useState(1);
  const [likesCurPage, setLikesCurPage] = useState(1);
  const [postPageCount, setPostPageCount] = useState(0);
  const [commentPageCount, setCommentPageCount] = useState(0);
  const [likesPageCount, setLikesPageCount] = useState(0);

  const userLikes = useSelector((state: RootState) => state.user.user.postLikes);

  const { data: postData } = useUserData('posts', postCurtPage, id);
  const { data: commentData } = useUserData('comments', commentCurtPage, id);
  const { data: likesData } = useUserData('likes', likesCurPage, id);
  useEffect(() => {
    // 유저가 작성한 글 가져오기
    // setPostPageCount(Math.ceil(postData.totalPosts / 3));
    console.log(postData);
    console.log(likesData);
  }, [id]);

  return (
    <Container>
      <List>
        <p className="sub-title">내가 작성한 글</p>
        {postsData && postsData.map(post => <UserPostData key={post.postNumber} post={post} />)}
        {/* <Pagination pageCount={pageCount1} onPageChange={handlePageChange1} /> */}
      </List>
      <List>
        <p className="sub-title">내가 작성한 댓글</p>
        {commentsData && commentsData.map((comment, idx) => <UserCommentData key={idx} {...comment} />)}
        {/* <Pagination pageCount={pageCount2} onPageChange={handlePageChange2} /> */}
      </List>
      <List>
        <p className="sub-title">좋아요 누른 글</p>
        {userLikes && userLikes.map(user => <UserLikes key={user.postNumber} {...user} />)}
        {/* <Pagination pageCount={pageCount2} onPageChange={handlePageChange2} /> */}
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

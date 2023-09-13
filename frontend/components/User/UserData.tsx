import { Comment, CommentType, PostType, User } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPostData from './UserPostData';
import UserCommentData from './UserCommentData';
import useDataLog from '@/hooks/user/useDataLog';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import UserLikes from './UserLikes';
import Pagination from '../Common/Pagenation';

export default function UserData({ data }: { data: User }) {
  const [postsData, setPostsData] = useState<PostType[]>();
  const [commentsData, setCommentsData] = useState<Comment[]>();
  const { id, name, mail } = data;
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [pageCount1, setPageCount1] = useState(0);
  const [pageCount2, setPageCount2] = useState(0);

  const userLikes = useSelector((state: RootState) => state.user.user.postLikes);

  // const userDataLogQuery = useDataLog(id);

  useEffect(() => {
    // 유저가 작성한 글 가져오기
    const fetchUserPosts = async () => {
      try {
        const response = await api.get(`/my/posts?user=${id}&page=${currentPage1}`);
        setPostsData(response.data.userPosts);
        setPageCount1(Math.ceil(response.data.totalPosts / 3));
      } catch (error) {
        console.error(error);
      }
    };

    // 유저가 작성한 댓글 가져오기
    const fetchUserComments = async () => {
      try {
        const response = await api.get(`/my/comments?user=${id}&page=${currentPage2}`);
        setCommentsData(response.data.userAllComments);
        setPageCount2(Math.ceil(response.data.totalComments / 3));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPosts();
    fetchUserComments();
  }, [id, currentPage1, currentPage2]);

  const handlePageChange1 = (selectedPage: { selected: number }) => {
    setCurrentPage1(selectedPage.selected + 1);
  };

  const handlePageChange2 = (selectedPage: { selected: number }) => {
    setCurrentPage2(selectedPage.selected + 1);
  };

  return (
    <Container>
      <List>
        <p className="sub-title">내가 작성한 글</p>
        {postsData && postsData.map(post => <UserPostData key={post.postNumber} post={post} />)}
        <Pagination pageCount={pageCount1} onPageChange={handlePageChange1} />
      </List>
      <List>
        <p className="sub-title">내가 작성한 댓글</p>
        {commentsData && commentsData.map((comment, idx) => <UserCommentData key={idx} {...comment} />)}
        <Pagination pageCount={pageCount2} onPageChange={handlePageChange2} />
      </List>
      <List>
        <p className="sub-title">좋아요 누른 글</p>
        {userLikes && userLikes.map(user => <UserLikes key={user.postNumber} {...user} />)}
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

import { Comment, CommentType, PostType, User } from '@/types/type';
import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPostData from './UserPostData';
import UserCommentData from './UserCommentData';
import useDataLog from '@/hooks/user/useDataLog';

export default function UserData({ data }: { data: User }) {
  const [postsData, setPostsData] = useState<PostType[]>();
  const [commentsData, setCommentsData] = useState<Comment[]>();
  const { id, name, mail } = data;

  const userDataLogQuery = useDataLog(id);

  useEffect(() => {
    // userData가 로드된 후에 userPosts와 userComments
    if (userDataLogQuery.data) {
      const { userPosts, userAllComments } = userDataLogQuery.data;
      setPostsData(userPosts);
      setCommentsData(userAllComments);
    }
  }, [userDataLogQuery.data]);

  return (
    <Container>
      <List>
        <p className="sub-title">내가 작성한 글</p>
        {postsData && postsData.map(post => <UserPostData key={post.postNumber} post={post} />)}
      </List>
      <List>
        <p className="sub-title">내가 작성한 댓글</p>
        {commentsData && commentsData.map((comment, idx) => <UserCommentData key={idx} {...comment} />)}
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

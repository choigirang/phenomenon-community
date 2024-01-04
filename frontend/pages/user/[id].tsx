import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { api } from '@/util/api';
import UserCard from '@/components/User/UserCard';
import { SearchUser } from '@/types/type';

import styled from 'styled-components';

/**
 *
 * @returns 유저 메인 페이지
 */
export default function UserPage() {
  const [data, setData] = useState<SearchUser>();

  const router = useRouter();
  const user = router.query.id;
  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      api.get(`/user/${user}`).then(res => setData(res.data));
    }
  }, [user]);

  function stripHtml(html: string): string {
    return html.replace(/<[^>]*>?/gm, '');
  }

  return (
    data && (
      <Container>
        <UserCard data={data} />
        {/* 작성한 글 목록 */}
        <List>
          <p className="title">작성한 글</p>
          {data.posts.map(post => (
            <Post href={`/community/post/${post.postNumber}`} key={post.postNumber}>
              <div className="title-date">
                <span className="title">{post.title}</span>
                <span className="date">{post.date}</span>
              </div>
              <p>{stripHtml(post.body)}</p>
            </Post>
          ))}
        </List>
      </Container>
    )
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px calc(100% - 300px);
  gap: 20px;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: solid 1px var(--color-dark-gray);
  border-radius: 5px;
  background-color: var(--color-dark-white);
  padding: var(--padding-side);
`;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(129, 129, 250, 0.2);
  padding: var(--padding-content);
  font-size: var(--size-text);

  .title-date {
    display: flex;
    justify-content: space-between;
  }
`;

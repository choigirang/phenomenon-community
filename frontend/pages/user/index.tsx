import { api } from '@/util/api';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function index() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    api.get('/users').then(res => {
      setUsers(res.data.usersData);
      console.log(res.data);
    });
  }, []);

  return (
    <Container>
      {users &&
        users.map(user => (
          <UserCard key={user} href={`/user/${user}`}>
            {user}
          </UserCard>
        ))}
    </Container>
  );
}

const Container = styled.div`
  height: 150px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const UserCard = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-dark-blue);
  border-radius: 3px;
  box-shadow: 3px var(--color-gray);
`;

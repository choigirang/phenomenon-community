import { User } from '@/types/type';
import React from 'react';
import styled from 'styled-components';

export default function UserCard({ data }: { data: User }) {
  const { id, name, mail } = data;

  return (
    <Container>
      <div className="id">
        <span className="weight">아이디 :</span> {id}
      </div>
      <div className="name">
        <span className="weight">닉네임 :</span> {name}
      </div>
      <div className="mail">
        <span className="weight">이메일 : </span>
        {mail}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  border: solid 2px var(--color-dark-blue);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: var(--size-sub-title);
  padding: var(--padding-side);

  .weight {
    font-weight: 500;
  }

  .name {
    display: flex;
  }
`;

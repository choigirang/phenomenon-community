import { PROFILE_URL } from '@/constant/constant';
import { SearchUser, User } from '@/types/type';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

export default function UserCard({ data }: { data: User | SearchUser }) {
  const { id, name, img } = data;

  return (
    <Container>
      <Image src={PROFILE_URL(img)} alt="profile" width={200} height={200} priority={true} />
      <div className="id">
        <span className="weight">아이디 :</span> {id}
      </div>
      <div className="name">
        <span className="weight">닉네임 :</span> {name}
      </div>
      {'mail' in data && (
        <div className="mail">
          <span className="weight">이메일 : </span>
          {data.mail}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 300px;
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

  img {
    margin: 0 auto;
  }
`;

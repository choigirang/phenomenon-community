import React from 'react';
import Image from 'next/image';

import { SearchUser, User } from '@/types/type';
import { PROFILE_URL } from '@/constant/constant';

import styled from 'styled-components';

/**
 * @param data my page || user search 에서 사용될 유저 데이터
 */
export default function UserCard({ data }: { data: User }) {
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

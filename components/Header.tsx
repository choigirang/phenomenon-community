import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function Header() {
  const category = ['명예의 전당', '게시글', '공지사항'];
  const router = useRouter();

  return (
    <Container>
      <div className="logo">logo</div>
      <div className="category-box">
        {category.map(each => (
          <a className="category-text" onClick={() => router.push(each)} key={each}>
            {each}
          </a>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: relative;
  background: gray;

  .logo {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
    height: 30px;
    background: white;
  }

  .category-box {
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }

  .category-text {
    padding: 5px;
    font-size: var(--size-title);
    padding: var(--padding-text);
  }
`;

import React, { useMemo } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { AiFillFacebook, AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import { HEADER_NAV } from '@/constant/constant';
import Link from 'next/link';

export default function Footer() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);

  return (
    <Container>
      <div className="logo-box">
        <Logo />
      </div>
      <Info>
        <ul>
          SITE MAP HEADER
          {category.map(each => (
            <li key={HEADER_NAV[each]} className="nav-item">
              <Link href={HEADER_NAV[each]}>{each}</Link>
            </li>
          ))}
        </ul>
        <ul className="link">
          CONNECTED
          <li>
            <Link href="https://github.com/choigirang" target="blank">
              <AiFillGithub /> GITHUB
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/choi_girang/" target="blank">
              <AiFillInstagram /> INSTAGRAM
            </Link>
          </li>
          <li>
            <Link href="https://www.facebook.com/profile.php?id=100031457192835" target="blank">
              <AiFillFacebook /> FACEBOOX
            </Link>
          </li>
        </ul>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: 40% 60%;
  padding: 0 calc((100% - 1280px) / 2);
  background-color: var(--color-blue);
  color: white;
  margin-top: 50px;
  position: fixed;
  bottom: 0;

  .logo-box {
    padding-top: 50px;
    position: relative;
    color: white !important;

    :link,
    :visited {
      color: white !important;
    }
  }
`;

const Info = styled.div`
  width: 100%;
  color: white;
  display: flex;

  ul {
    padding: var(--padding-content);
    padding-top: 50px;
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 21px;
  }

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--size-title);
    font-weight: 300;

    :link,
    :visited {
      color: white;
    }
  }
`;

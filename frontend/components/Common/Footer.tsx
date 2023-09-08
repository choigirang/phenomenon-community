import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { AiFillFacebook, AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import { HEADER_NAV } from '@/constant/constant';
import Link from 'next/link';

export default function Footer() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    // 화면이 로드될 때 컨텐츠 높이 계산
    const updateContainerStyle = () => {
      const windowHeight = window.innerHeight;
      const contentHeight = document.body.clientHeight;
      console.log(windowHeight, contentHeight);
      if (windowHeight - 300 > contentHeight) {
        setContainerStyle({
          position: 'fixed',
          bottom: 0,
          width: '100%',
        });
      } else {
        setContainerStyle({
          position: 'static', // 높이가 충분하면 static으로 설정
        });
      }
    };

    window.addEventListener('resize', updateContainerStyle);
    updateContainerStyle();

    return () => {
      window.removeEventListener('resize', updateContainerStyle);
    };
  }, []);

  return (
    <Container style={containerStyle}>
      <div className="logo-box">
        <Logo />
      </div>
      <Info>
        <ul>
          SITE MAP
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

const Container = styled.footer`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: 40% 60%;
  padding: 0 calc((100% - 1280px) / 2);
  background-color: var(--color-blue);
  margin-top: 100px;
  color: white;
  /* position: fixed;
  bottom: 0; */

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
    gap: 12px;
    font-size: 18px;
    color: var(--color-dark-blue);
  }

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;

    :link,
    :visited {
      color: white;
    }
  }
`;

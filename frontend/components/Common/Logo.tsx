import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

export default function Logo() {
  return (
    <LogoLink href={'/'}>
      아왜? <span>커뮤니티</span>
    </LogoLink>
  );
}

const LogoLink = styled(Link)`
  font-family: 'Giants-Inline';
  font-size: 27px;
  color: var(--color-blue);

  :link,
  :visited {
    color: var(--color-dark-blue);
  }

  span {
    color: white;
    text-shadow: -2px 0px var(--color-blue), 0px 2px var(--color-light-blue), 2px 0px var(--color-blue),
      0px -2px var(--color-light-blue);
  }
`;

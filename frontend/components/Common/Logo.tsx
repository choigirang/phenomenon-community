import { useRouter } from 'next/router';
import React from 'react';

export default function Logo() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return <div onClick={handleLogoClick}>Logo</div>;
}

import { useRouter } from 'next/router';
import React from 'react';

export default function useLink(link: string) {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return {
    handleClick,
  };
}

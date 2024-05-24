'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/** 2024/05/10 - user input hooks */
export default function useInputs(src: string | number) {
  // user input
  const [keyword, setKeyword] = useState<string | number>('');
  const router = useRouter();

  // click search btn func
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/${src}?keyword=${keyword}`);
  };
  // user input func
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setKeyword(value);
  };
  // user press Enter key func
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(e.currentTarget.value);
      router.push(`/${src}?keyword=${keyword}`);
    }
  };
  // click reset btn func
  const setInit = () => {
    setKeyword('');
    router.push(`/${src}`);
  };

  return { keyword, setKeyword, onChange, onClick, onEnter, setInit };
}

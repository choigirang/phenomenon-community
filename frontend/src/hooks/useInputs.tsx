'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

// 초깃값 없을 시 2중 에러

/**
 * 데이터 입력 훅
 * @returns input state hooks
 */
export default function useInputs(src: string | number) {
  const [keyword, setKeyword] = useState<string | number>('');
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/${src}?keyword=${keyword}`);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setKeyword(value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(e.currentTarget.value);
      router.push(`/${src}?keyword=${keyword}`);
    }
  };

  const setInit = () => {
    setKeyword('');
    router.push(`/${src}`);
  };

  return { keyword, setKeyword, onChange, onClick, onEnter, setInit };
}

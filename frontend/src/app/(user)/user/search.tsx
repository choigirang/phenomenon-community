'use client';

import { ArrowPathIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, KeyboardEvent, MouseEvent, PropsWithChildren, useState } from 'react';

export default function Search({ children }: PropsWithChildren) {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleKeyword = (e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
    if (e.type === 'change') {
      const event = e as ChangeEvent<HTMLInputElement>;

      setKeyword(event.target.value);
    } else if (e.type === 'keydown') {
      const event = e as KeyboardEvent<HTMLInputElement>;

      if (event.key === 'Enter') {
        if (keyword === '') return alert('아이디를 입력해주세요.');
        else router.push(`/user?search=${keyword}`);
      }
    }
  };

  const search = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (keyword === '') return alert('아이디를 입력해주세요.');

    router.push(`/user?search=${keyword}`);
  };

  const reset = () => {
    setKeyword('');
    router.push('/user');
  };

  return (
    <React.Fragment>
      <div className="flex w-full justify-center">
        <div className="flex w-1/2 justify-center gap-2 text-xs">
          <input
            onChange={e => handleKeyword(e)}
            onKeyDown={e => handleKeyword(e)}
            placeholder="아이디를 입력하세요."
            className="w-[70%] border p-default"
            value={keyword}
          />
          <button type="button" className="p-default bg-gray text-white" onClick={search}>
            검색
          </button>
          <button type="button" className="p-default bg-gray" onClick={reset}>
            <ArrowPathIcon width={12} height={12} color="white" />
          </button>
        </div>
      </div>
      {children}
    </React.Fragment>
  );
}

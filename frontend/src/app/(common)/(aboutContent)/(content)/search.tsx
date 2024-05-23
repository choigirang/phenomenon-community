'use client';

import useInputs from '@/hooks/useInputs';
import { ArrowPathIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface Props {
  children?: React.ReactNode;
  src: string;
  placeholder: string;
}

export default function Search({ children, src, placeholder }: Props) {
  const { keyword, onChange, onClick, onEnter, setInit } = useInputs(src);

  return (
    <React.Fragment>
      <div className="flex w-full justify-center">
        <div className="flex w-1/2 justify-center gap-2 text-xs">
          <input
            onChange={onChange}
            onKeyDown={onEnter}
            placeholder={placeholder}
            className="w-[70%] border p-default"
            value={keyword}
          />
          <button type="button" className="p-default bg-gray text-white" onClick={onClick}>
            검색
          </button>
          <button type="button" className="p-default bg-gray" onClick={setInit}>
            <ArrowPathIcon width={12} height={12} color="white" />
          </button>
        </div>
      </div>
      {children}
    </React.Fragment>
  );
}

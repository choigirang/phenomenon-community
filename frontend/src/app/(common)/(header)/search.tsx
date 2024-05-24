'use client';

import useInputs from '@/hooks/useInputs';

import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/16/solid';

/** 2024/05/10 - link search page - search bar in header*/
export default function Search() {
  // input hooks
  const { keyword, onChange, onEnter } = useInputs('search');

  return (
    <div className="absolute w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between items-center p-2 border-4 border-blue">
      <input
        value={keyword}
        onChange={onChange}
        onKeyDown={onEnter}
        className="w-full h-full text-xs py-2 outline-none"
        placeholder="게시글 통합검색"
      />
      <SearchIcon width={16} height={16} className="text-lightBlue cursor-pointer" />
    </div>
  );
}

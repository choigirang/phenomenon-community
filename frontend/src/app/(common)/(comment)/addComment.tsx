'use client';

import { ChangeEvent, useState } from 'react';

function postComment() {}

export default function AddComment() {
  const [content, setContent] = useState('');

  const writeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex w-full bg-lightGray border-y-4 border-blue p-default">
      <span className="w-[100px]">{/** 사용자명 */}</span>
      <div className="flex flex-col items-end w-[100%] gap-1">
        <textarea
          className="w-[100%] border border-gray bg-white"
          maxLength={400}
          rows={6}
          onChange={e => writeComment(e)}
        />
        <button type="button" className="px-default py-1 text-white text-md font-bold bg-lightBlue">
          등록
        </button>
      </div>
    </div>
  );
}

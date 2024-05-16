'use client';

import React, { ChangeEvent, PropsWithChildren, useState } from 'react';

export default function Search({ children }: PropsWithChildren) {
  const [keyword, setKeyword] = useState('');

  const handleKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <React.Fragment>
      <input onChange={e => handleKeyword(e)}></input>
      {children}
    </React.Fragment>
  );
}

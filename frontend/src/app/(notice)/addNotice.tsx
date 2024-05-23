'use client';

import { useAppSelector } from '@/hooks/useRedux';
import { LoginIni } from '@/type/user/type';
import { PencilIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import React from 'react';

export default function AddNotice() {
  const user: LoginIni = useAppSelector(state => state.loginSlice);

  return (
    <React.Fragment>
      {user.super && (
        <Link href={'/notice/add'} aria-label="notice add">
          <PencilIcon width={16} height={16} />
        </Link>
      )}
    </React.Fragment>
  );
}

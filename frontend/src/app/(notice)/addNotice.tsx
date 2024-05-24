'use client';

import React from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/useRedux';

import { LoginIni } from '@/type/user/type';

import { PencilIcon } from '@heroicons/react/16/solid';

/** 2024/05/12 - add notice func btn */
export default function AddNotice() {
  // check super user
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

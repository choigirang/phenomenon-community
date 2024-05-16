'use client';

import Link from 'next/link';
import NotLogin from './notLogin';
import { useAppSelector } from '@/hooks/useRedux';
import { LoginIni } from '@/type/user/type';
import ExistLogin from './existLogin';

const STYLE = {
  container: 'flex justify-center items-center w-full min-h-[120px] p-3 text-xs border border-blue self-start',
};

export default function Login() {
  const user: LoginIni = useAppSelector(state => state.loginSlice);

  return (
    <div className={STYLE.container}>
      {user.id ? (
        <ExistLogin {...user} />
      ) : (
        <NotLogin>
          <Link href={'/user/sign'}>회원가입</Link>
          <Link href={'/user/findId'}>아이디·비밀번호</Link>
        </NotLogin>
      )}
    </div>
  );
}

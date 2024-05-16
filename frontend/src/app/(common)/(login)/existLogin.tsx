'use client';

import { URL } from '@/constant/constant';
import useLogin from '@/hooks/useLogin';
import { LoginIni } from '@/type/user/type';
import { ArrowRightCircleIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import Link from 'next/link';

export default function ExistLogin(user: LoginIni) {
  const { handleLogout } = useLogin();

  const [mail, domain] = user.mail.split('@');

  return (
    <div className="w-full h-full flex justify-start gap-2">
      <Image src={`${URL + user.img}`} alt="user img" width={100} height={100} />
      <div className="flex flex-col">
        <Link href={`/user/${user.id}`}>
          <h2 className="flex items-center gap-2">
            <span className="text-sm font-bold text-lightBlue">{user.name}</span>
            <ArrowRightCircleIcon width={12} height={12} className="cursor-pointer text-blue" />
          </h2>
          <span className="text-gray">{mail}</span>
        </Link>
        <button className="w-full bg-blue" onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

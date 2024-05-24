import Image from 'next/image';
import Link from 'next/link';

import { UserType } from '@/type/user/type';

import { PROFILE_URL } from '@/constant/constant';

/** 2024/05/16 - user img card */
export default function Card(data: UserType) {
  return (
    <li className="flex justify-center items-center border border-gray/50 p-default">
      <Link href={`/user/${data.id}`} className="flex w-full h-full flex-col justify-center items-center gap-2">
        <Image src={PROFILE_URL(data.img)} alt="user img" width={70} height={70} className="rounded-lg" />
        <h3>{data.id}</h3>
      </Link>
    </li>
  );
}

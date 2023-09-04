import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Logo() {
  return (
    <Link href={'/'}>
      <Image src={''} alt="example" width={40} height={40}></Image>
    </Link>
  );
}

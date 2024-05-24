'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** 2024/05/23 - last process page in Sign page */
export default function Complete() {
  const router = useRouter();

  // auto move home page
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[300px]">
      <p>회원가입이 완료되었습니다.</p>
      <p>홈 화면으로 이동됩니다.</p>
    </div>
  );
}

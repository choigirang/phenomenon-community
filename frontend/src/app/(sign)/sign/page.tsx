import Link from 'next/link';
import Process from '../process';
import Agree from '../agree';
import Info from '../info';
import Complete from '../complete';

import { SearchParams } from '@/type/common';
import { getMetadata } from '@/constant/metaData';
import { Metadata } from 'next';

/** sign page meta */
export const generateMetadata = async (props: SearchParams): Promise<Metadata> => {
  const path = props.searchParams.page;

  const pathTitle: { [key: string]: string } = {
    agree: '필수 동의',
    info: '개인 정보 입력',
    complete: '회원 가입 완료',
  };

  return getMetadata({ title: pathTitle[path], asPath: `/sign?page=${path}` });
};

/** 2024/05/23 - second process page in Sign page */
export default function Page(props: SearchParams) {
  const path = props.searchParams.page;

  return (
    <div className="flex flex-col gap-4 w-full">
      {path && <Process path={path} />}
      {path === 'agree' && <Agree />}
      {path === 'info' && <Info />}
      {path === 'complete' && <Complete />}
      {/* if user use url in this page */}
      {!path && (
        <div className="flex flex-col gap-2 justify-center items-center w-full h-[300px]">
          잘못된 접근입니다.
          <Link href={'/'} className="p-default bg-blue text-white">
            홈으로 이동
          </Link>
        </div>
      )}
    </div>
  );
}

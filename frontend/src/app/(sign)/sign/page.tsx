import Link from 'next/link';
import Process from '../process';
import Agree from '../agree';
import Info from '../info';
import Complete from '../complete';

import { SearchParams } from '@/type/common';

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

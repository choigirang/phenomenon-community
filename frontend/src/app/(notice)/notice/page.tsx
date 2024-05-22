import Pagination from '@/app/(common)/pagination';
import { Notice, SearchParams } from '@/type/common';
import { api } from '@/util/api';
import Link from 'next/link';
import AddNotice from './addNotice';

async function getData(page: string = '1') {
  const API = `/notice?page=${page}`;
  const res = await api.get(API);
  return res.data;
}

export default async function Page(props: SearchParams) {
  const pageParam = props.searchParams.page;

  const { notice, totalNotice } = await getData(pageParam);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <h2 className="w-full pb-default text-center text-blue text-xl font-bold">공지사항</h2>
        <AddNotice />
      </div>
      <ul className="w-full flex flex-col gap-2 text-sm border-y-4 border-blue">
        {notice.map((each: Notice) => (
          <li key={each.noticeNumber} className="w-full p-default border-b last:border-0">
            <Link href={`/notice/${each.noticeNumber}`} className="w-full grid grid-cols-notice">
              <span className="text-center text-blue">{each.noticeNumber}</span>
              <span>{each.title}</span>
              <span className="text-right text-lightGray">{each.date}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination src="notice" total={totalNotice}></Pagination>
    </div>
  );
}

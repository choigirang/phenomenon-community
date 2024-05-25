import { Metadata } from 'next';
import Search from '../../(common)/(aboutContent)/(content)/search';
import Card from '../card';
import Pagination from '@/app/(common)/pagination';
import { api } from '@/util/api';
import { getMetadata } from '@/constant/metaData';

import { SearchParams } from '@/type/common';
import { UserType } from '@/type/user/type';

/** user page meta */
export const generateMetadata = async (params: SearchParams): Promise<Metadata> => {
  const pageParam = params.searchParams.page || 1;
  const user = params.searchParams.keyword;

  function title() {
    if (user) return `${user} 검색 ${pageParam} 페이지`;
    else return `유저 검색 ${pageParam} 페이지`;
  }

  return getMetadata({ title: title(), asPath: '/user' });
};

// (user id && user) || all users
async function getUser(page: string = '1', user: string) {
  try {
    if (user) {
      const res = await api.get(`/users?id=${user}`);
      return res.data;
    } else {
      const res = await api.get(`/users?page=${page}`);
      return res.data;
    }
  } catch (err) {
    return console.log('check err:', err);
  }
}

/** 2024/05/23 - user list page */
export default async function Page(params: SearchParams) {
  const pageParam = params.searchParams.page;
  const user = params.searchParams.keyword;
  // data of search user
  const { users, totalUsers } = await getUser(pageParam, user);

  return (
    <section className="flex flex-col gap-2">
      <Search src="user" placeholder="아이디를 입력해주세요.">
        {users ? (
          <ul className="grid grid-cols-5 gap-2">
            {users.map((user: UserType) => (
              <Card key={user.id} {...user} />
            ))}
          </ul>
        ) : (
          <div className="w-full text-center">검색된 유저가 없습니다.</div>
        )}
      </Search>
      {totalUsers !== 0 && <Pagination src={'user'} total={totalUsers} />}
    </section>
  );
}

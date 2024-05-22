import { UserType } from '@/type/user/type';
import { api } from '@/util/api';
import Search from './search';
import { SearchParams } from '@/type/common';
import Card from './card';

async function getUser(user: string) {
  try {
    if (user) {
      const res = await api.get(`/searchUser?id=${user}`);
      return res.data;
    } else {
      const res = await api.get('/users');
      return res.data;
    }
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page(params: SearchParams) {
  const user = params.searchParams.search;
  const data = await getUser(user);

  const userData: UserType[] = user ? data.findUser : data.findAllUser;

  return (
    <section className="flex flex-col gap-2">
      <Search>
        {userData ? (
          <ul className="grid grid-cols-5 gap-2">
            {userData.map(user => (
              <Card key={user.id} {...user} />
            ))}
          </ul>
        ) : (
          <div className="w-full text-center">검색된 유저가 없습니다.</div>
        )}
      </Search>
    </section>
  );
}

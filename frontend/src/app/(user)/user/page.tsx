import { UserType } from '@/type/user/type';
import { api } from '@/util/api';
import Card from './card';
import Search from './search';

async function getUser(user: string) {
  try {
    const res = await api.get(`/users`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { findAllUser }: { findAllUser: UserType[] } = await getUser(id);

  return (
    <section className="flex flex-col">
      <Search>
        <ul className="grid grid-cols-5 gap-2">
          {findAllUser.map(user => (
            <Card key={user.id} {...user} />
          ))}
        </ul>
      </Search>
    </section>
  );
}

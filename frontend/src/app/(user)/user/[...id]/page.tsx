import { PROFILE_URL, URL } from '@/constant/constant';
import { UserType } from '@/type/user/type';
import { api } from '@/util/api';
import Image from 'next/image';

async function getUser(user: string) {
  try {
    const res = await api.get(`/searchUser?id=${user}`);
    return res.data;
  } catch (err) {
    return console.log('check err:', err);
  }
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const { findUser } = await getUser(id[0]);
  const user = findUser[0];

  return (
    <div className="grid grid-cols-user">
      <div className="flex flex-col p-default border-2 border-lightBlue">
        <Image src={PROFILE_URL(user.img)} alt="user img" width={100} height={100} />
        <span>{user.id}</span>
      </div>
    </div>
  );
}

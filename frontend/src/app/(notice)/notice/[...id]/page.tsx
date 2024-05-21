import { Notice, SearchParams } from '@/type/common';
import { api } from '@/util/api';

async function getData(id: string) {
  const res = await api.get(`/notice/${id}`);
  return res.data;
}

export default async function Page(props: SearchParams) {
  const num = props.params.id;
  const data: Notice = await getData(num[0]);
  console.log(data);

  return <div></div>;
}

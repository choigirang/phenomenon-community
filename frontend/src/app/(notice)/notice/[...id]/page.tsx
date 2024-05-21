import Content from '@/app/(common)/(aboutContent)/(content)/content';
import Edit from '@/app/(common)/(aboutContent)/(content)/edit';
import Title from '@/app/(common)/(aboutContent)/(content)/title';
import { Notice, SearchParams } from '@/type/common';
import { api } from '@/util/api';

async function getData(id: string) {
  const res = await api.get(`/notice/${id}`);
  return res.data;
}

export default async function Page(props: SearchParams) {
  const num = props.params.id;
  const data: Notice = await getData(num[0]);

  const addData = { views: undefined, likes: undefined };

  return (
    <section className="flex flex-col">
      <Title data={{ ...data, ...addData }} src="공지사항"></Title>
      <Content body={data.content} />
    </section>
  );
}

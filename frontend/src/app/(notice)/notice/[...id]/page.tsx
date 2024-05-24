import Content from '@/app/(common)/(aboutContent)/(content)/content';
import Title from '@/app/(common)/(aboutContent)/(content)/title';
import { api } from '@/util/api';

import { Notice, SearchParams } from '@/type/common';

// get each notice data
async function getData(id: string) {
  const res = await api.get(`/notice/${id}`);
  return res.data;
}

/** 2024/05/21 - each notice page */
export default async function Page(props: SearchParams) {
  const num = props.params.id;
  const data: Notice = await getData(num[0]);

  // add props for Title compoent
  const addData = { views: undefined, likes: undefined };

  return (
    <section className="flex flex-col">
      <Title data={{ ...data, ...addData }} src="공지사항"></Title>
      <Content body={data.content} />
    </section>
  );
}

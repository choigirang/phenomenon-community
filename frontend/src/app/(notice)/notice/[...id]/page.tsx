import { Metadata } from 'next';
import Content from '@/app/(common)/(aboutContent)/(content)/content';
import Title from '@/app/(common)/(aboutContent)/(content)/title';
import { api } from '@/util/api';
import { getMetadata } from '@/constant/metaData';

import { Notice, SearchParams } from '@/type/common';

/** each notice page meta */
export const generateMetadata = async (page: SearchParams): Promise<Metadata> => {
  const num = page.params.id;

  return getMetadata({
    title: `게시글 수정`,
    asPath: `/notice/${num}`,
  });
};

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

import React, { useRef, useState, useEffect } from 'react';
import usePostForm from '@/hooks/usePostForm';

import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { NextPage } from '@/styles/GlobalComponents';
import { api } from '@/util/api';

const Editor = dynamic(() => import('../../components/Community/PostEditor'), { ssr: false });

export default function add() {
  const [htmlStr, setHtmlStr] = useState<string>('');

  const { title, date, titleHandler, dateHandler, submitHandler } = usePostForm();

  useEffect(() => {
    dateHandler();
  }, []);

  const postHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log({ title, content: htmlStr, date });
    // await api.post("/posts",{title, content: htmlStr, date: dateHandler})
  };

  return (
    <React.Fragment>
      <PostContainer>
        <Title
          type="text"
          className="title"
          placeholder="제목을 입력하세요."
          onChange={e => titleHandler(e)}
          required
        />
        <EditorContainer>
          <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
        </EditorContainer>
      </PostContainer>
      <NextPage>
        <button className="btn" onSubmit={e => postHandler(e)}>
          제출
        </button>
      </NextPage>
    </React.Fragment>
  );
}

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-blue);
`;

const Title = styled.input`
  width: 500px;
  height: 50px;
  border: var(--border-solid1) var(--color-dark-white);
  padding: 0 var(--padding-side);
  margin-bottom: var(--margin-solo);

  ::placeholder {
    color: var(--color-gray);
  }
`;

const EditorContainer = styled.div`
  width: 100%;

  .editor {
    height: 600px;
  }
`;

const Contents = {
  Container: styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 40px;

    & > div {
      width: 600px;
      padding: 16px;
      box-sizing: border-box;
      line-break: anywhere;
    }
  `,

  HtmlContainer: styled.div`
    border: 2px solid orange;
  `,

  ViewContainer: styled.div`
    border: 2px solid olive;
  `,
};

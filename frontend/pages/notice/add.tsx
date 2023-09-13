import usePostForm from '@/hooks/post/usePostForm';
import { RootState } from '@/redux/store';
import { NextPage } from '@/styles/GlobalComponents';
import { api } from '@/util/api';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Editor = dynamic(() => import('../../components/Community/PostEditor'), { ssr: false });

export default function Add() {
  const [htmlStr, setHtmlStr] = useState<string>('');
  const router = useRouter();

  // 로그인한 유저의 정보 reducer
  const user = useSelector((state: RootState) => state.user.user);

  const { title, titleHandler, dateHandler, submitHandler } = usePostForm();

  const postHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user.login && user.name && user.super) {
      await api
        .post('/notice', { title, content: htmlStr, date: dateHandler() })
        .then(res => {
          alert('작성이 완료되었습니다.');
          router.push('/');
        })
        .catch(err => {
          alert('작성 오류입니다.');
          router.push('/');
        });
    }
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
        <NextPage>
          <button className="btn" onClick={e => postHandler(e)}>
            제출
          </button>
        </NextPage>
      </PostContainer>
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
  border: var(--border-solid1) var(--color-light-gray);
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

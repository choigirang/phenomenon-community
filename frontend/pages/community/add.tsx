import React, { useRef, useState, useEffect, FC } from 'react';

import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { NextPage } from '@/styles/GlobalComponents';
import { api } from '@/util/api';
import htmlToDraft from 'html-to-draftjs';
import { ContentState, EditorState } from 'draft-js';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import usePostForm from '@/hooks/post/usePostForm';
import { CATEGORY } from '@/constant/constant';

const Editor = dynamic(() => import('../../components/Community/PostEditor'), { ssr: false });

export default function add() {
  // 작성한 데이터 (markdown)
  const [htmlStr, setHtmlStr] = useState<string>('');
  // 카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  // 로그인한 유저의 정보 reducer
  const user = useSelector((state: RootState) => state.user.user);

  const { title, titleHandler, dateHandler, submitHandler } = usePostForm();

  const postHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user.login && user.name) {
      await api
        .post('/posts', { title, body: htmlStr, date: dateHandler(), author: user.id, category: selectedCategory })
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

  // 카테고리 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  /** 카테고리 선택 */
  const category = Object.keys(CATEGORY);

  return (
    <React.Fragment>
      <PostContainer>
        <Top>
          <Title
            type="text"
            className="title"
            placeholder="제목을 입력하세요."
            onChange={e => titleHandler(e)}
            required
          />
          <SelectBox onChange={handleCategoryChange}>
            <option selected disabled>
              카테고리 선택
            </option>
            {category.map(item => (
              <option key={item}>{item}</option>
            ))}
          </SelectBox>
        </Top>
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

const Top = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: var(--margin-solo);
`;

const Title = styled.input`
  width: 500px;
  height: 50px;
  border: var(--border-solid1) var(--color-light-gray);
  padding: 0 var(--padding-side);

  ::placeholder {
    color: var(--color-gray);
  }
`;

const SelectBox = styled.select`
  width: 150px;
  height: 50px;
  border: var(--border-solid1) var(--color-light-gray);
  padding: var(--padding-text);
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

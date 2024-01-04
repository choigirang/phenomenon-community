import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useMutation } from 'react-query';
import { queryClient } from '@/pages/_app';

import { api } from '@/util/api';
import usePostForm from '@/hooks/post/usePostForm';
import { CATEGORY } from '@/constant/constant';
import { PostType } from '@/types/type';

import styled from 'styled-components';
import { NextPage } from '@/styles/GlobalComponents';

const Editor = dynamic(() => import('../../../components/Community/PostEditor'), { ssr: false });

/**
 * 게시글 페이지에서 사용자 일치 여부에 따라 이동될 수정 페이지
 * @returns 이전 게시글에서 작성된 데이터를 받아와 내용 기입 및 수정
 */
export default function Add() {
  // 작성한 데이터 (markdown)
  const [htmlStr, setHtmlStr] = useState<string>('');
  // 카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const router = useRouter();

  // 포스팅 데이터
  const [data, setData] = useState<PostType>();

  // 로그인한 유저의 정보 reducer
  const user = useSelector((state: RootState) => state.user.user);

  const { title, titleHandler, dateHandler, submitHandler } = usePostForm();

  // 댓글 수정 핸들러
  async function editPost() {
    const res = await api.post(`/edit/${router.query.id}`, {
      title,
      body: htmlStr,
      date: dateHandler(),
      author: user.id,
      category: selectedCategory,
    });

    return res.data;
  }

  // 댓글 수정 mutate
  const { mutate } = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      alert('수정이 완료되었습니다.');
      router.push('/');
    },
    onError: () => {
      alert('작성 오류입니다.');
      router.push('/');
    },
  });

  // 게시글 받아오기
  useEffect(() => {
    if (router.query.id !== undefined) {
      api.get(`/post/${router.query.id}`).then(res => {
        setData(res.data);
      });
    }
  }, [router.query.id]);

  // 카테고리 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  /** 카테고리 선택 */
  const category = Object.keys(CATEGORY);

  const postHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCategory === '') return alert('카테고리 선택이 필요합니다.');

    if (user.login && user.name) {
      mutate();
    }
  };

  return (
    <React.Fragment>
      <PostContainer>
        <Top>
          {/* 타이틀 */}
          <Title
            type="text"
            className="title"
            placeholder="제목을 입력하세요."
            defaultValue={data && data.title}
            onChange={e => titleHandler(e)}
            required
          />
          {/* 카테고리 */}
          <SelectBox onChange={handleCategoryChange}>
            <option value="">카테고리 선택</option>
            {category.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </SelectBox>
        </Top>
        {/* 내용 */}
        <EditorContainer>
          <Editor htmlStr={(data && data.body) || ''} setHtmlStr={setHtmlStr} />
        </EditorContainer>
        <NextPage>
          <button className="btn" onClick={e => postHandler(e)}>
            수정
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

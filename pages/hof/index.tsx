import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Post } from '@/types/type';
import axios from 'axios';

export default function index() {
  // 검색창
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<Post[]>();

  useEffect(() => {
    axios.get('/dummy').then(res => {
      setData(res.data);
    });
  });

  // 검색창 입력값
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Container>
      <InputBox>
        <Input placeholder="게시글 검색" onChange={e => handleChange(e)} />
        <FaSearch color="var(--color-blue)" />
      </InputBox>
      <PostContainer>{data && data.map(res => <PostList key={res.memberId}></PostList>)}</PostContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputBox = styled.div`
  width: 40%;
  min-width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--padding-content);
  padding: var(--padding-text);
  border: solid 3px var(--color-blue);
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;

  :focus {
    outline: none;
  }
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  background: gray;
`;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;
`;

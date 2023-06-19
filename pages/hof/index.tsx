import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export default function index() {
  // 검색창
  const [value, setValue] = useState<string>('');

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
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
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

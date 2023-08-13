import usePostForm from '@/hooks/usePostForm';
import { Container } from '@/styles/GlobalComponents';
import React from 'react';

export default function add() {
  const [title, content, date, titleHandler, contentHandler, dateHandler, submitHandler] = usePostForm();

  // 카테고리에서 현재 글 쓰는 카테고리 위치 가져오기
  return <Container>add</Container>;
}

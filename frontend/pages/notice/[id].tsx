import NoticeDetail from '@/components/Notice/NoticeDetail';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  const [noticeNum, setNoticeNum] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    const id = Number(router.query.id);
    setNoticeNum(id);
  }, [router]);

  return <Container>{noticeNum && <NoticeDetail id={noticeNum} />}</Container>;
}

const Container = styled.div`
  width: 100%;
`;

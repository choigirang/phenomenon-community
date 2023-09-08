import NoticeDetail from '@/components/Notice/NoticeDetail';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function index() {
  const [noticeNum, setNoticeNum] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const id = router.query.id as string;
    setNoticeNum(id);
  }, [router]);

  return <Container>{noticeNum && <NoticeDetail id={noticeNum} />}</Container>;
}

const Container = styled.div`
  width: 100%;
`;

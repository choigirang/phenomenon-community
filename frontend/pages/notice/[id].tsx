import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import NoticeDetail from '@/components/Notice/NoticeDetail';

import styled from 'styled-components';

/**
 *
 * @returns 공지사항 개별 페이지
 */
export default function Index() {
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

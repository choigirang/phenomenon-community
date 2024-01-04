import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PostDetail from '@/components/Community/PostDetail';

import styled from 'styled-components';

/**
 *
 * @returns 포스팅 번호에 따른 개별 포스팅 페이지
 */
export default function Index() {
  const [postNum, setPostNum] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    const id = Number(router.query.id);
    if (!isNaN(id)) {
      setPostNum(id);
    } else {
      setPostNum(undefined);
    }
  }, [router]);

  return <Container>{postNum && <PostDetail id={postNum} />}</Container>;
}

const Container = styled.div`
  width: 100%;
`;

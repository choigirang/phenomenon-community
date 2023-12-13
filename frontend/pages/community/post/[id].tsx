import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import PostDetail from '@/components/Community/PostDetail';

import styled from 'styled-components';

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

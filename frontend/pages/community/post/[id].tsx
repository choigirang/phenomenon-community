import { Container } from '@/styles/GlobalComponents';
import React, { useEffect, useState } from 'react';
import Login from '@/components/Common/Login';
import PostDetail from '@/components/Community/PostDetail';
import { useRouter } from 'next/router';
import { usePostDetail } from '@/hooks/usePostDetail';
import { PostType } from '@/types/type';

export default function index() {
  const [postNum, setPostNum] = useState<number | undefined>();
  const router = useRouter();

  useEffect(() => {
    const id = Number(router.query.id);
    setPostNum(id);
  }, [router]);

  return (
    <Container>
      {postNum && <PostDetail id={postNum} />}
      <Login />
    </Container>
  );
}

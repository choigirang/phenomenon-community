import { useNoticeDetail } from '@/hooks/notice/useNoticeDetail';
import React from 'react';

export default function NoticeDetail({ id }: { id: number }) {
  const queryResult = useNoticeDetail(id);

  return <div>NoticeDetail</div>;
}

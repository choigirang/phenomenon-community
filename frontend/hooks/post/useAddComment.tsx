import { queryClient } from '@/pages/_app';
import { CommentAPI } from '@/types/type';
import { api } from '@/util/api';
import { useMutation } from 'react-query';

/**
 * 댓글 추가 hooks
 * @param src 데이터 설정 post인지 gallery인지
 * @param id 게시글 number
 * @param data 댓글에 대한 데이터(작성자, 날짜 등)
 * @returns
 */
export function useAddComment(src: string, id: number, data: CommentAPI) {
  // src에 따른 fetch 함수
  async function fetchComment() {
    const response = await api.post(src === 'post' ? '/post/comment' : '/gallery/comment', data);
    return response.data;
  }

  return useMutation(src === 'post' ? ['post', id] : ['gallery', id], fetchComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(src === 'post' ? ['post', id] : ['gallery', id]);
    },
  });
}

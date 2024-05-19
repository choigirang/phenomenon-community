'use client';

import useLogin from '@/hooks/useLogin';
import { useAppSelector } from '@/hooks/useRedux';
import { CommentData } from '@/type/common';
import { PostType } from '@/type/community/type';
import { LoginIni } from '@/type/user/type';
import { api } from '@/util/api';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { Dispatch } from 'redux';

interface AddCommentProps {
  data: PostType;
  setComments: React.Dispatch<SetStateAction<CommentData[]>>;
}

export default function AddComment(props: AddCommentProps) {
  // check login
  const user: LoginIni = useAppSelector(state => state.loginSlice);

  const [content, setContent] = useState('');

  // handle write comment data
  const writeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addComment = () => {
    // 날짜 생성
    const getDate = new Date();
    const date = getDate.getFullYear() + '-' + (getDate.getMonth() + 1) + '-' + getDate.getDate();

    // 댓글 데이터
    const comment = { postNumber: props.data.postNumber, author: user.id, comment: content, date };
    if (content) {
      // add commnet
      api.post('/post/comment', { ...comment }).then(res => {
        alert('댓글이 작성되었습니다.');
        props.setComments(prev => [comment, ...prev]);
        setContent('');
      });
    } else {
      alert('댓글을 작성해주세요.');
    }
  };

  return (
    <div className="flex w-full bg-lightGray border-y-4 border-blue p-default">
      <span className="w-[100px]">{/** 사용자명 */}</span>
      <div className="flex flex-col items-end w-[100%] gap-1">
        <textarea
          className={`w-[100%] p-default border border-gray ${user.id ? 'bg-white' : 'bg-gray/30'}`}
          maxLength={400}
          rows={6}
          onChange={e => writeComment(e)}
          disabled={user.id ? false : true}
          value={`${!user.id ? '로그인이 필요합니다.' : content}`}
        />
        <button
          disabled={user.id ? false : true}
          type="button"
          className="px-default py-1 text-white text-md font-bold bg-lightBlue"
          onClick={addComment}>
          등록
        </button>
      </div>
    </div>
  );
}

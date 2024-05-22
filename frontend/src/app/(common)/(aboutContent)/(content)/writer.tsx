'use client';

import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import useEditor from '@/hooks/useEditor';
import { api } from '@/util/api';
import { useRouter } from 'next/navigation';
import { PostType } from '@/type/community/type';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

interface WriterProps {
  data?: PostType;
  notice?: boolean;
  btnName?: string;
}

/**
 * @param htmlStr 작성된 데이터
 * @param setHtmlStr 데이터 수정
 * post/add 에서 사용될 에디터
 */
export default function Writer({ data, notice, btnName = '수정하기' }: WriterProps) {
  const [noticeTit, setNoticeTit] = useState('');
  const router = useRouter();
  const user = useAppSelector(state => state.loginSlice);

  // 데이터 작성
  const { content, editorState, toolbar, dateHandler, onEditorStateChange } = useEditor(data ? data.body : '');

  // 글 수정 || 공지 추가
  const editHandler = () => {
    if (data) {
      api
        .post(`/edit/${data.postNumber}`, { ...data, body: content })
        .then(() => alert('게시글이 수정되었습니다.'))
        .catch(() => alert('서버에러 입니다.'))
        .finally(() => router.push('/'));
    } else {
      api
        .post('/notice', { author: user.id, title: noticeTit, content, date: dateHandler() })
        .then(() => alert('공지사항이 작성되었습니다.'))
        .catch(() => alert('서버에러입니다.'))
        .finally(() => router.push('/'));
    }
  };

  const noticeTitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNoticeTit(value);
  };

  return (
    <React.Fragment>
      {notice && <input onChange={e => noticeTitHandler(e)} placeholder="제목을 입력하세요." />}
      <div className="flex flex-col border p-5 text-black">
        <Editor
          editorClassName="editor"
          toolbarClassName="toolbar"
          toolbar={toolbar}
          placeholder="내용을 입력하세요"
          localization={{ local: 'ko' }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <button type="button" onClick={editHandler} className="text-white bg-blue px-default py-2 cursor-pointer">
        {btnName}
      </button>
    </React.Fragment>
  );
}

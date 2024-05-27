'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from 'react-draft-wysiwyg';
import useEditor from '@/hooks/useEditor';
import { api } from '@/util/api';
import { useAppSelector } from '@/hooks/useRedux';

import { PostType } from '@/type/community/type';
import useDate from '@/hooks/useDate';

interface WriterProps {
  data?: PostType;
  notice?: boolean;
  btnName?: string;
}

/** 2024/05/20 - post & notice editor in parent(each page) */
export default function Writer({ data, notice, btnName = '수정하기' }: WriterProps) {
  // set title when add notice
  const [noticeTit, setNoticeTit] = useState('');
  const router = useRouter();
  // check login user
  const user = useAppSelector(state => state.loginSlice);

  // writer hooks
  const { content, editorState, toolbar, onEditorStateChange } = useEditor(data ? data.body : '');

  // date hooks
  const { date } = useDate();

  // add notice or edit post func
  const editHandler = () => {
    if (data) {
      // edit post
      api
        .post(`/edit/${data.postNumber}`, { ...data, body: content })
        .then(() => alert('게시글이 수정되었습니다.'))
        .catch(() => alert('서버에러 입니다.'))
        .finally(() => router.push('/'));
    } else {
      // add notice
      api
        .post('/notice', { author: user.id, title: noticeTit, content, date })
        .then(() => alert('공지사항이 작성되었습니다.'))
        .catch(() => alert('서버에러입니다.'))
        .finally(() => router.push('/'));
    }
  };

  // set title when notice func
  const noticeTitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNoticeTit(value);
  };

  return (
    <React.Fragment>
      {/* add title when notice page */}
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

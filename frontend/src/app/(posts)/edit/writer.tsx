'use client';

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import useEditor from '@/hooks/useEditor';
import { api } from '@/util/api';
import { useRouter } from 'next/navigation';
import { PostType } from '@/type/community/type';

/**
 * @param htmlStr 작성된 데이터
 * @param setHtmlStr 데이터 수정
 * post/add 에서 사용될 에디터
 */
export default function Writer(data: PostType) {
  const router = useRouter();

  // 데이터 작성
  const { content, editorState, toolbar, onEditorStateChange } = useEditor(data.body);

  // 글 수정
  const editHandler = () => {
    api
      .post(`/edit/${data.postNumber}`, { ...data, body: content })
      .then(() => alert('게시글이 수정되었습니다.'))
      .catch(() => alert('서버에러 입니다.'))
      .finally(() => router.push('/'));
  };

  return (
    <React.Fragment>
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
        수정하기
      </button>
    </React.Fragment>
  );
}

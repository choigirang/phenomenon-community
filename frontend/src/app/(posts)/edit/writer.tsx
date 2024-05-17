'use client';

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

import useStorage from '@/hooks/useStorage';
import useEditor from '@/hooks/useEditor';

interface IEditor {
  htmlStr: string;
}

/**
 * @param htmlStr 작성된 데이터
 * @param setHtmlStr 데이터 수정
 * post/add 에서 사용될 에디터
 */
export default function Writer({ htmlStr }: IEditor) {
  // 유저 확인
  const { storageId } = useStorage();
  // 데이터 작성
  const { editorState, toolbar, onEditorStateChange } = useEditor(htmlStr);

  return (
    <div className="border p-5 text-black">
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
  );
}

'use client';

import { useState, useEffect } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function useEditor(htmlStr: string) {
  const [content, setContent] = useState(htmlStr);
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 클라이언트 사이드에서만 실행되는 코드
      const blockFromHtml = htmlToDraft(content);
      if (blockFromHtml) {
        const { contentBlocks, entityMap } = blockFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }, [htmlStr]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadCallback = (file: Blob) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append('multipartFiles', file);
      };

      reader.readAsDataURL(file);
    });
  };

  const toolbar = {
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
    image: { uploadCallback: uploadCallback },
  };

  const dateHandler = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  return { content, editorState, toolbar, dateHandler, onEditorStateChange };
}

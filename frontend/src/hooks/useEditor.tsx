'use client';

import { useState, useEffect } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/** 2024/05/17 - draft editor in post edit page*/
export default function useEditor(htmlStr: string) {
  // user input content
  const [content, setContent] = useState(htmlStr);
  // editor state with html
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  useEffect(() => {
    // change content => html code
    const blockFromHtml = htmlToDraft(content);
    if (blockFromHtml) {
      const { contentBlocks, entityMap } = blockFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [htmlStr]);

  // editor content covert func
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  // editor files uploader func
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

  // tool bar options
  const toolbar = {
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
    image: { uploadCallback: uploadCallback },
  };

  // create date func
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

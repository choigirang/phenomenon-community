'use client';

import { useState, useEffect } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import '@/style/react-draft-wysiwyg.css';

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

  return { content, editorState, toolbar, onEditorStateChange };
}

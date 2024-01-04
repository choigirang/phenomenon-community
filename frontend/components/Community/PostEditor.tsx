import React, { useState, useEffect } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import styled from 'styled-components';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @param htmlStr 작성된 데이터
 * @param setHtmlStr 데이터 수정
 * post/add 에서 사용될 에디터
 */
export default function PostEditor({ htmlStr, setHtmlStr }: IEditor) {
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  useEffect(() => {
    const blockFromHtml = htmlToDraft(htmlStr);
    if (blockFromHtml) {
      const { contentBlocks, entityMap } = blockFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [htmlStr]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
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

  const localization = {
    locale: 'ko',
  };

  return (
    <>
      <Container>
        <Editor
          editorClassName="editor"
          toolbarClassName="toolbar"
          toolbar={toolbar}
          placeholder="내용을 입력하세요"
          localization={localization}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  border: var(--border-solid1) var(--color-dark-white);
  padding: var(--padding-content);
`;

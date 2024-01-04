import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AxiosResponse } from 'axios';
import Image from 'next/image';

import { api } from '@/util/api';
import usePostForm from '@/hooks/post/usePostForm';
import { CATEGORY } from '@/constant/constant';

import styled from 'styled-components';
import { NextPage } from '@/styles/GlobalComponents';

const Editor = dynamic(() => import('../../components/Community/PostEditor'), { ssr: false });

/**
 *
 * @returns 타이틀, 카테고리, 내용 등의 데이터 작성
 */
export default function Add() {
  // 작성한 데이터 (markdown)
  const [htmlStr, setHtmlStr] = useState<string>('');
  // 카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  // 갤러리 선택
  const [checkGallery, setCheckGallery] = useState(false);
  // 이미지 파일 선택
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // 이미지 미리 보기
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  // 이미지 파일 크기
  const [totalFileSize, setTotalFileSize] = useState<number>(0);
  // 이미지 파일 진행 상황
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  // 로그인한 유저의 정보 reducer
  const user = useSelector((state: RootState) => state.user.user);

  const { title, titleHandler, dateHandler, submitHandler } = usePostForm();

  // 카테고리 핸들러
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(CATEGORY[e.target.value]);
  };

  /** 카테고리 선택 */
  const category = Object.keys(CATEGORY);

  const postHandler = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedCategory === '') return alert('카테고리 선택이 필요합니다.');

    if (user.login && user.name) {
      await api
        .post('/posts', {
          title,
          body: htmlStr,
          date: dateHandler(),
          author: user.id,
          name: user.name,
          category: selectedCategory,
        })
        .then(res => {
          alert('작성이 완료되었습니다.');
          router.push('/');
        })
        .catch(err => {
          alert('작성 오류입니다.');
          router.push('/');
        });
    }
  };

  // 이미지 파일 변경
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles: FileList | null = e.target.files;

    if (!inputFiles) return;

    // FileList를 Array로 변환
    const files: File[] = Array.from(inputFiles);

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    const selectedValidFiles: File[] = files.filter(file => {
      return allowedTypes.includes(file.type) && file.size <= maxSize;
    });

    setSelectedFiles(selectedValidFiles);

    const totalSize = selectedValidFiles.reduce((total, file) => total + file.size, 0);
    setTotalFileSize(totalSize);

    const imagePreviews = selectedValidFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  // 이미지 업로드
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('이미지를 선택하세요.');
      return;
    }

    // 이미지 업로드 요청 보내기
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    formData.append('title', title); // 제목
    formData.append('date', dateHandler()); // 날짜
    formData.append('author', user.id); // 작성자 ID

    try {
      const res: AxiosResponse<{ imageUrls: string[] }> = await api.post('/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          // 업로드 진행 상황 감지
          const progress = Math.round((progressEvent.loaded / totalFileSize) * 100);
          setUploadProgress(progress);
        },
      });

      if (res.status === 200) {
        alert('이미지 업로드 성공');
        router.push('/');
      }
    } catch (error) {
      alert('이미지 업로드 실패');
    }
  };

  return (
    <React.Fragment>
      <PostContainer>
        <Top>
          {/* 타이틀 */}
          <Title
            type="text"
            className="title"
            placeholder="제목을 입력하세요."
            onChange={e => titleHandler(e)}
            required
          />
          {/* 카테고리 */}
          <SelectBox onChange={handleCategoryChange} disabled={checkGallery}>
            <option value="">카테고리 선택</option>
            {category
              .filter(item => item !== '전체')
              .map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </SelectBox>
          {/* 이미지 선택 여부 */}
          <CheckGallery>
            <input type="checkbox" id="gallery" onClick={() => setCheckGallery(!checkGallery)} />{' '}
            <label htmlFor="gallery">갤러리에 올리기</label>
          </CheckGallery>
        </Top>
        {!checkGallery ? (
          <EditorContainer>
            <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
          </EditorContainer>
        ) : (
          <InputImg>
            {/* 이미지 선택 시 이미지 삽입 */}
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
            {selectedFiles.length > 0 && (
              <div className="preview-box">
                <p className="preview">선택한 이미지 미리보기:</p>
                {previewImages.map((preview, index) => (
                  <Image key={index} src={preview} alt={`미리보기 ${index}`} style={{ maxWidth: '500px' }} />
                ))}
              </div>
            )}
            {uploadProgress > 0 && (
              <div>
                <h3>업로드 진행 상황</h3>
                <p>진행률: {uploadProgress}%</p>
              </div>
            )}
          </InputImg>
        )}
        <NextPage>
          <button className="btn" onClick={e => (!checkGallery ? postHandler(e) : handleUpload())}>
            제출
          </button>
        </NextPage>
      </PostContainer>
    </React.Fragment>
  );
}

const PostContainer = styled.div`
  width: 100%;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-blue);
`;

const Top = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: var(--margin-solo);
`;

const Title = styled.input`
  width: 500px;
  height: 50px;
  border: var(--border-solid1) var(--color-light-gray);
  padding: 0 var(--padding-side);

  ::placeholder {
    color: var(--color-gray);
  }
`;

const SelectBox = styled.select`
  width: 150px;
  height: 50px;
  border: var(--border-solid1) var(--color-light-gray);
  padding: var(--padding-text);
`;

const CheckGallery = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputImg = styled.div`
  .preview-box {
    display: flex;
    flex-direction: column;
  }

  .preview {
    margin: var(--margin-side) 0;
  }
`;

const EditorContainer = styled.div`
  width: 100%;

  .editor {
    height: 600px;
  }
`;

const Contents = {
  Container: styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 40px;

    & > div {
      width: 600px;
      padding: 16px;
      box-sizing: border-box;
      line-break: anywhere;
    }
  `,

  HtmlContainer: styled.div`
    border: 2px solid orange;
  `,

  ViewContainer: styled.div`
    border: 2px solid olive;
  `,
};

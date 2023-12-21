import React, { useState } from 'react';
import styled from 'styled-components';

type ImageProps = {
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function ImageSelect({ selectedImage, setSelectedImage }: ImageProps) {
  /* 이미지 핸들러 */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <ImageContainer className="each-data">
      <Label htmlFor="img">프로필</Label>
      <ImageBox className="img-box">
        <input name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
        <span>선택하지 않을 시 기본 이미지로 설정됩니다.</span>
      </ImageBox>
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  width: 100%;
  padding: var(--padding-content);
  position: relative;
  display: grid;
  grid-template-columns: 20% 80%;
`;

const Label = styled.label`
  font-size: var(--size-sub-title);
  font-weight: 500;
  line-height: 30px;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;

  input {
    border: none !important;
    padding-left: 0 !important;
  }

  span {
    font-size: var(--size-text);
    color: var(--color-gray);
  }
`;

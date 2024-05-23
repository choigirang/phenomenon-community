'use client';

import useSignInfo from '@/hooks/useSignInfo';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Id from './id';
import Profile from './profile';
import Password from './password';
import Name from './name';
import Email from './email';
import Security from './security';

export default function Info() {
  const {
    agreementCheck,
    selectedImage,
    setSelectedImage,
    id,
    setId,
    pass,
    setPass,
    name,
    setName,
    mail,
    setMail,
    inputAble,
    setInputAble,
    security,
    setSecurity,
    checkSecurity,
    setCheckSecurity,
    checkMailOpt,
  } = useSignInfo();

  return (
    <React.Fragment>
      <div className="text-blue font-bold">기본 정보 입력</div>
      <form
        onSubmit={agreementCheck}
        method="post"
        encType="multipart/form-data"
        className="flex flex-col px-[10%] py-[5%] border border-lightGray">
        <Profile selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

        <Id id={id} setId={setId} />

        <Name nickName={name} setNickName={setName} />

        <Password checkPass={pass} setCheckPass={setPass} />

        <Email userMail={mail} setUserMail={setMail} inputAble={inputAble} setInputAble={setInputAble}>
          <Security
            security={security}
            setSecurity={setSecurity}
            checkSecurity={checkSecurity}
            checkMailOpt={checkMailOpt}
            setCheckSecurity={setCheckSecurity}
            userMail={mail}
          />
        </Email>
        <button type="button" onClick={agreementCheck} className="p-default bg-blue text-white">
          다음
        </button>
      </form>
    </React.Fragment>
  );
}

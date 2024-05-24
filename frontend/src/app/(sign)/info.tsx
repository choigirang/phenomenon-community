'use client';

import React from 'react';
import Id from './(info)/id';
import Profile from './(info)/profile';
import Password from './(info)/password';
import Name from './(info)/name';
import Email from './(info)/email';
import Security from './(info)/security';
import useSignInfo from '@/hooks/useSignInfo';

/** 2024/05/23 - user info input in parent: sign page */
export default function Info() {
  // about user info hooks
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
        {/* profile img */}
        <Profile selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        {/* user id */}
        <Id id={id} setId={setId} />
        {/* user nickname */}
        <Name nickName={name} setNickName={setName} />
        {/* user password */}
        <Password checkPass={pass} setCheckPass={setPass} />
        {/* user email with security code */}
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

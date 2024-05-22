'use client';

import useSignInfo from '@/hooks/useSignInfo';
import { AxiosSecurityCode, CheckId, CheckName, CheckPass, CheckSecurityType, InputType } from '@/type/sign/type';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Id from './id';

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
        className="flex flex-col px-[10%] py-[5%]">
        <Id id={id} setId={setId} />
      </form>
    </React.Fragment>
  );
}

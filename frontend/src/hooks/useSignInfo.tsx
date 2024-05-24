'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/util/api';

import { AxiosSecurityCode, CheckId, CheckName, CheckPass, CheckSecurityType, InputType } from '@/type/sign/type';

/** 2024/05/22 - user input info in sign page  */
export default function useSignInfo() {
  // img
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // id validation
  const [id, setId] = useState<CheckId>({
    userId: '',
    required: false,
  });
  // password validation
  const [pass, setPass] = useState<CheckPass>({
    pass: '',
    required: false,
  });
  // nickname validation
  const [name, setName] = useState<CheckName>({
    name: '',
    checkName: false,
  });
  //  email validation
  const [mail, setMail] = useState<InputType>({
    mail: '',
    domain: '',
  });
  // input email without select domain
  const [inputAble, setInputAble] = useState<boolean>(false);
  // security code with server
  const [security, setSecurity] = useState<AxiosSecurityCode>({
    code: '',
    userCode: '',
  });
  // check security code with user code
  const [checkSecurity, setCheckSecurity] = useState<CheckSecurityType>({
    agree: false,
    compareSecurityCode: false,
    errInfo: '',
    errCode: '',
  });
  // check user input mail & agreement
  const checkMailOpt = mail.mail !== '' && mail.domain !== '' && checkSecurity.agree;

  const router = useRouter();

  //  send user info api
  const agreementCheck = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    // add profile img
    if (selectedImage) {
      formData.append('profileImage', selectedImage);
    } else {
      formData.append('profileImage', 'default');
    }
    // add user info
    formData.append('id', id.userId);
    formData.append('password', pass.pass);
    formData.append('name', name.name);
    formData.append('mail', `${mail.mail}@${mail.domain}`);
    // validation user info func
    const signIn = () => {
      if (!id.required) return alert('아이디 중복 검사가 필요합니다.');
      if (!name.checkName) return alert('닉네임 중복 검사가 필요합니다.');
      if (!pass.required) return alert('비밀번호를 확인해주세요.');
      if (!checkMailOpt) return alert('보안 코드를 확인해주세요.');
      api
        .post('/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          alert('회원가입이 완료되었습니다.');
        })
        .catch(err => {
          alert('서버 확인이 필요합니다.'), console.log(err);
        });
    };
    signIn();
    return router.push('/signup/complete');
  };

  return {
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
  };
}

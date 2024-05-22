'use client';

import { AxiosSecurityCode, CheckId, CheckName, CheckPass, CheckSecurityType, InputType } from '@/type/sign/type';
import { api } from '@/util/api';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function useSignInfo() {
  // 이미지
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 아이디
  const [id, setId] = useState<CheckId>({
    userId: '',
    required: false,
  });

  // 비밀번호
  const [pass, setPass] = useState<CheckPass>({
    pass: '',
    required: false,
  });

  // 닉네임
  const [name, setName] = useState<CheckName>({
    name: '',
    checkName: false,
  });

  //  이메일 관리
  const [mail, setMail] = useState<InputType>({
    mail: '',
    domain: '',
  });
  const [inputAble, setInputAble] = useState<boolean>(false);

  // 보안 코드 관리
  const [security, setSecurity] = useState<AxiosSecurityCode>({
    code: '',
    userCode: '',
  });
  const [checkSecurity, setCheckSecurity] = useState<CheckSecurityType>({
    agree: false,
    compareSecurityCode: false,
    errInfo: '',
    errCode: '',
  });

  // 메일 확인과 수집 동의 확인
  const checkMailOpt = mail.mail !== '' && mail.domain !== '' && checkSecurity.agree;

  const router = useRouter();

  //  제출
  const agreementCheck = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // 이미지를 추가
    if (selectedImage) {
      formData.append('profileImage', selectedImage);
    } else {
      formData.append('profileImage', 'default');
    }

    // 다른 입력 데이터 추가
    formData.append('id', id.userId);
    formData.append('password', pass.pass);
    formData.append('name', name.name);
    formData.append('mail', `${mail.mail}@${mail.domain}`);

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
        .catch(err => console.log(err));

      // if (checkSecurity.compareSecurityCode) {
    };
    signIn();
    return router.push('/signup/complete');
    // } else alert('회원 가입에 실패했습니다. 다시 진행해주세요.');
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

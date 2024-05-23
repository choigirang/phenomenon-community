'use client';

import { CheckPass } from '@/type/sign/type';
import { CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

type PasswordProps = {
  checkPass: CheckPass;
  setCheckPass: React.Dispatch<React.SetStateAction<CheckPass>>;
};

export default function Password({ checkPass, setCheckPass }: PasswordProps) {
  const [toggle, setToggle] = useState({ first: false, second: false });
  const [pass, setPass] = useState({
    firstPass: '',
    secondPass: '',
    length: false,
    word: false,
    validation: false,
  });

  const checkPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'firstPass') {
      setPass(prev => ({ ...prev, firstPass: value }));

      // 비밀번호 길이
      if (value.length >= 8 && value.length <= 20) setPass(prev => ({ ...prev, length: true }));
      else setPass(prev => ({ ...prev, length: false }));

      const check = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

      // 비밀번호 유효성
      if (check.test(value)) setPass(prev => ({ ...prev, word: true }));
      else setPass(prev => ({ ...prev, word: false }));
    }

    if (name === 'secondPass') {
      setPass(prev => ({ ...prev, secondPass: value }));

      if (pass.firstPass === value) {
        setPass(prev => ({ ...prev, validation: true }));
        setCheckPass({ pass: value, required: true });
      } else {
        setPass(prev => ({ ...prev, validation: false }));
        setCheckPass(prev => ({ ...prev, required: false }));
      }
    }
  };

  return (
    <div className="w-full grid grid-cols-info text-xs p-default">
      <label htmlFor="pass" className="font-bold">
        비밀번호
      </label>
      <div className="flex flex-col gap-1">
        {/* 1차 비밀번호 */}
        <div className="flex justify-between items-center border border-lightGray">
          <input
            id="pass"
            type={toggle.first ? 'text' : 'password'}
            name="firstPass"
            placeholder="비밀번호를 입력해주세요."
            onChange={checkPassHandler}
            required
            autoComplete="new-password"
            className="w-full p-default outline-none"
          />
          <div className="cursor-pointer" onClick={() => setToggle(prev => ({ ...prev, first: !prev.first }))}>
            {toggle.first ? <EyeSlashIcon width={12} height={12} /> : <EyeIcon width={12} height={12} />}
          </div>
        </div>
        {/* 2차 비밀번호 */}
        <div className="flex justify-between items-center border border-lightGray">
          <input
            type={toggle.second ? 'text' : 'password'}
            placeholder="비밀번호를 동일하게 입력해주세요."
            name="secondPass"
            onChange={checkPassHandler}
            required
            autoComplete="new-password"
            className="w-full p-default outline-none"
          />
          <div className="cursor-pointer" onClick={() => setToggle(prev => ({ ...prev, second: !prev.second }))}>
            {toggle.second ? <EyeSlashIcon width={12} height={12} /> : <EyeIcon width={12} height={12} />}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">비밀번호 필수 조건</span>
          <p className="flex gap-1">
            <CheckCircleIcon width={12} height={12} color={pass.word ? 'green' : ''} />
            <span className="text-lightGray">대소문자, 숫자, 특수문자 조합이어야 합니다.</span>
          </p>
          <p className="flex gap-1">
            <CheckCircleIcon width={12} height={12} color={pass.length ? 'green' : ''} />
            <span className="text-lightGray">8 ~ 20 글자입니다.</span>
          </p>
          <p className="flex gap-1">
            <CheckCircleIcon width={12} height={12} color={pass.validation ? 'green' : ''} />
            <span className="text-lightGray">1차,2차 비밀번호가 일치해야 합니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

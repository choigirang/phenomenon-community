'use client';

import { useState } from 'react';

import { CheckPass } from '@/type/sign/type';

import { CheckCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

type PasswordProps = {
  checkPass: CheckPass;
  setCheckPass: React.Dispatch<React.SetStateAction<CheckPass>>;
};

/** 2024/05/23 - user pass(parent: infoPage) in sign page */
export default function Password({ checkPass, setCheckPass }: PasswordProps) {
  // show | hide password
  const [toggle, setToggle] = useState({ first: false, second: false });
  // check password validation
  const [pass, setPass] = useState({
    firstPass: '',
    secondPass: '',
    length: false,
    word: false,
    validation: false,
  });

  // check password validation func
  const checkPassHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // first password
    if (name === 'firstPass') {
      setPass(prev => ({ ...prev, firstPass: value }));

      // length
      if (value.length >= 8 && value.length <= 20) setPass(prev => ({ ...prev, length: true }));
      else setPass(prev => ({ ...prev, length: false }));

      const check = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

      // special char
      if (check.test(value)) setPass(prev => ({ ...prev, word: true }));
      else setPass(prev => ({ ...prev, word: false }));
    }

    // second password
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
        {/* first password */}
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
        {/* second password */}
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
          {/* show | hide password */}
          <div className="cursor-pointer" onClick={() => setToggle(prev => ({ ...prev, second: !prev.second }))}>
            {toggle.second ? <EyeSlashIcon width={12} height={12} /> : <EyeIcon width={12} height={12} />}
          </div>
        </div>
        {/* password description */}
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

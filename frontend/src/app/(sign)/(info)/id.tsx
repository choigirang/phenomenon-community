'use client';

import React, { useState } from 'react';

import { api } from '@/util/api';

import { CheckId } from '@/type/sign/type';
import { CheckCircleIcon } from '@heroicons/react/16/solid';

type IdProps = {
  id: CheckId;
  setId: React.Dispatch<React.SetStateAction<CheckId>>;
};

interface IdValidate {
  length: boolean;
  word: boolean;
}
/** 2024/05/23 - user id(parent: infoPage) in sign page */
export default function Id({ id, setId }: IdProps) {
  // id validation
  const [checkId, setCheckId] = useState<IdValidate>({
    length: false,
    word: false,
  });

  // check id length & char validation func
  const checkIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // check id length 3~10
    const valueLength = value.length >= 3 && value.length <= 10;
    if (valueLength) {
      setCheckId(prev => ({
        ...prev,
        length: true,
      }));
    } else {
      setCheckId(prev => ({
        ...prev,
        length: false,
      }));
    }

    // check id char func
    function checkChar(value: string) {
      // special char
      const excludeSpecial = /[^\w\sㄱ-힣()0-9 ]/g;
      return excludeSpecial.test(value);
    }

    if (!checkChar(value)) {
      setCheckId(prev => ({
        ...prev,
        word: true,
      }));
    } else {
      setCheckId(prev => ({ ...prev, word: false }));
    }
  };

  // check duplicated api
  const checkDuplicateId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (checkId.length && checkId.word) {
      api
        .get(`/check?id=${id.userId}`)
        .then(res => {
          alert('사용할 수 있는 아이디입니다.');
          setId(prev => ({ ...prev, required: true }));
        })
        .catch(err => alert('사용할 수 없는 아이디입니다.'));
    }
  };

  return (
    <div className="relative grid grid-cols-info w-full text-xs p-default">
      <label htmlFor="id" className="font-bold">
        아이디
      </label>

      <div className="flex flex-col gap-1">
        {/* id input */}
        <div className="flex gap-3">
          <input
            id="id"
            value={id.userId}
            name="userId"
            type="text"
            onChange={e => {
              checkIdHandler(e);
              setId(prev => ({ ...prev, userId: e.target.value }));
            }}
            required
            className={`w-full ${
              checkId.length && checkId.word ? '' : 'text-red'
            } border border-lightGray p-default outline-none`}
          />
          {/* id duplicated btn */}
          <button
            type="button"
            onClick={e => checkDuplicateId(e)}
            disabled={id.required}
            className={`w-[100px] ${id.required ? 'bg-lightGray' : 'bg-blue'} text-white`}>
            중복검사
          </button>
        </div>
        <p className="flex gap-1">
          <CheckCircleIcon width={12} height={12} color={checkId.word && checkId.length ? 'green' : ''} />
          <span className="text-lightGray">특수문자 및 공백을 제외한 3글자 이상 10글자 이하의 문자여야 합니다.</span>
        </p>
      </div>
    </div>
  );
}

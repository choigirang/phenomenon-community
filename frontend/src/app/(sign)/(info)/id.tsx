import React, { useState } from 'react';

import { api } from '@/util/api';
import { CheckId } from '@/type/sign/type';

type IdProps = {
  id: CheckId;
  setId: React.Dispatch<React.SetStateAction<CheckId>>;
};

interface IdValidate {
  length: boolean;
  word: boolean;
}

/**
 *
 * @param id 작성된 아이디, 아이디 중복 검사 여부
 * @param setId
 * @returns 작성한 아이디의 중복 검사
 */
export default function Id({ id, setId }: IdProps) {
  const [checkId, setCheckId] = useState<IdValidate>({
    length: false,
    word: false,
  });

  // 아이디 유효성 확인
  const checkIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // 아이디 길이 확인
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

    // 아이디 특수문자 확인
    function checkChar(value: string) {
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

  // 아이디 중복 검사
  const checkDuplicateId = () => {
    if (checkId.length && checkId.word) {
      api
        .get(`/check?id=${id}`)
        .then(res => {
          alert('사용할 수 있는 아이디입니다.');
          setId(prev => ({ ...prev, required: true }));
        })
        .catch(err => alert('사용할 수 없는 아이디입니다.'));
    }
  };

  return (
    <div className="relative grid grid-cols-id w-full text-xs p-default">
      <label htmlFor="id" className="font-bold">
        아이디
      </label>

      <div className="flex flex-col gap-1">
        {/* 아이디 작성 input */}
        <div className="flex gap-3">
          <input
            id="id"
            name="userId"
            type="text"
            onChange={e => {
              checkIdHandler(e);
              setId(prev => ({ ...prev, userId: e.target.value }));
            }}
            required
            className={`w-full ${checkId.length && checkId.word ? 'text-red' : ''} border border-lightGray p-default`}
          />
          {/* 아이디 중복 검사 */}
          <button
            onClick={checkDuplicateId}
            disabled={!checkId.length || !checkId.word}
            className="w-[100px] bg-blue text-white">
            중복검사
          </button>
        </div>
        <span>특수문자 및 공백을 제외한 3글자 이상 10글자 이하의 문자여야 합니다.</span>
      </div>
    </div>
  );
}

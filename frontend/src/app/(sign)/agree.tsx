'use client';

import { PRIVATE_TEXT, SERVICE_TEXT } from '@/constant/constant';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AgreementData {
  id: string;
  title: string;
  text: string;
  name: 'useCheck' | 'privateCheck';
}

const serviceData: AgreementData[] = [
  {
    id: 'check1',
    title: '· 이용약관동의 예시입니다.',
    text: SERVICE_TEXT,
    name: 'useCheck',
  },
  {
    id: 'check2',
    title: '· 개인정보처리방침 예시입니다.',
    text: PRIVATE_TEXT,
    name: 'privateCheck',
  },
];

export default function Agree() {
  // 필수 동의
  const [check, setCheck] = useState({
    useCheck: false,
    privateCheck: false,
  });

  const router = useRouter();

  // 필수 동의 상태 변경
  const handleCheckboxChange = (name: 'useCheck' | 'privateCheck') => {
    setCheck(prevCheck => ({ ...prevCheck, [name]: !prevCheck[name] }));
  };

  const agreementCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!check.useCheck || !check.privateCheck) return alert('필수 항목에 동의해야 합니다.');
    return router.push('/sign?page=info');
  };

  return (
    <div className="flex flex-col w-full gap-5">
      {serviceData.map(data => (
        <div key={data.id} className="flex flex-col gap-4 text-xs">
          <span className="text-red font-bold">{data.title}</span>
          <pre className="h-[300px] p-5 overflow-scroll whitespace-pre-wrap  border border-blue">{data.text}</pre>
          <label htmlFor={data.id} className="flex justify-end items-center gap-3">
            <input
              id={data.id}
              type="checkbox"
              checked={check[data.name]}
              onChange={() => handleCheckboxChange(data.name)}
              required
            />
            [필수] 내용을 확인했으며, 동의합니다.
          </label>
        </div>
      ))}
      <button type="button" onClick={agreementCheck} className="p-default bg-blue text-white">
        다음
      </button>
    </div>
  );
}

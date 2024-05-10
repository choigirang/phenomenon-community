"use client"

import { useState } from "react";

// 초깃값 없을 시 2중 에러

/**
 * 데이터 입력 훅
 * @returns input state hooks
 */
export default function useInputs(initialData: string | number) {
  const [keyword, setKeyword] = useState<string | number>(initialData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setKeyword(value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setKeyword(e.currentTarget.value);
    }
  };

  const setInit = () => {
    setKeyword("");
  };

  return [keyword, onChange, onEnter, setInit] as const;
}

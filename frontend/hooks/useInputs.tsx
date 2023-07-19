import { useState } from 'react';

// 초깃값 없을 시 2중 에러
export default function useInputs<T>(initialData: T) {
  const [data, setData] = useState(initialData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setData(value as T);
  };

  return [data, onChange] as const;
}

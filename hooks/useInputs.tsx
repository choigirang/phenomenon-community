import { useState } from 'react';

// 초깃값 없을 시 2중 에러
function useInputs(initialData: string) {
  const [data, setData] = useState(initialData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  return [data, onChange, setData];
}

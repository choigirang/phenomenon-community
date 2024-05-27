'use client';

import { useEffect, useState } from 'react';

/** 2024/05/27 - date generate */
export default function useDate() {
  const [date, setDate] = useState<string>('0000-00-00');

  // create date func
  const dateHandler = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  useEffect(() => {
    if (window) {
      setDate(dateHandler());
    }
  }, []);

  return { date };
}

import { useState } from 'react';

/**
 *
 * @returns 타이틀, 날짜 등의 데이터 전송
 */
function usePostForm() {
  const [title, setTitle] = useState('');

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const dateHandler = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const submitHandler = () => {
    setTitle('');
  };

  return {
    title,
    titleHandler,
    dateHandler,
    submitHandler,
  };
}

export default usePostForm;

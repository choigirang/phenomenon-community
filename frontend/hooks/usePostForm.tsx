import { useState } from 'react';

function usePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const dateHandler = (newDate: Date) => {
    setDate(newDate);
  };

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTitle('');
    setContent('');
    setDate(new Date());
  };

  return {
    title,
    content,
    date,
    titleHandler,
    contentHandler,
    dateHandler,
    submitHandler,
  };
}

export default usePostForm;

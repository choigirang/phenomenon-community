'use client';

import { ChangeEvent, SetStateAction, useState } from 'react';
import useEditor from '@/hooks/useEditor';
import { useAppSelector } from '@/hooks/useRedux';
import { api } from '@/util/api';

import { CommentData } from '@/type/common';
import { PostType } from '@/type/community/type';
import { GalleryType } from '@/type/gallery/type';
import { LoginIni } from '@/type/user/type';

/** 2024/05/22 - 타입 가드 post or gallery */
function isPostType(data: PostType | GalleryType): data is PostType {
  return (data as PostType).postNumber !== undefined;
}

interface AddCommentProps {
  data: PostType | GalleryType;
  setComments: React.Dispatch<SetStateAction<CommentData[]>>;
}

/** 2024/05/22 - 댓글 추가 parent: ...page */
export default function AddComment(props: AddCommentProps) {
  // check login
  const user: LoginIni = useAppSelector(state => state.loginSlice);
  // comment content
  const [content, setContent] = useState('');
  // create date
  // const { dateHandler } = useEditor('');

  // handle write comment data
  const writeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const addComment = () => {
    if (content) {
      // type guard post
      if (isPostType(props.data)) {
        const comment = { postNumber: props.data.postNumber, author: user.id, comment: content, date: '' }; // date: dateHandler()
        api.post('/post/comment', { ...comment }).then(res => {
          alert('댓글이 작성되었습니다.');
          props.setComments(prev => [comment, ...prev]);
          setContent('');
        });
      } else {
        // gallery post
        const comment = {
          galleryNumber: props.data.galleryNumber,
          author: user.id,
          comment: content,
          date: '', //dateHandler()
        };
        api
          .post('/gallery/comment', { ...comment })
          .then(res => {
            props.setComments(prev => [comment, ...prev]);
            setContent('');
          })
          .then(() => alert('댓글이 작성되었습니다.'));
      }
    } else {
      alert('댓글을 작성해주세요.');
    }
  };

  return (
    <div className="flex w-full bg-lightGray border-y-4 border-blue p-default">
      <span className="w-[100px]">{/** 사용자명 */}</span>
      <div className="flex flex-col items-end w-[100%] gap-1">
        <textarea
          className={`w-[100%] p-default border border-gray ${user.id ? 'bg-white' : 'bg-gray/30'}`}
          maxLength={400}
          rows={4}
          onChange={e => writeComment(e)}
          disabled={user.id ? false : true}
          value={`${!user.id ? '로그인이 필요합니다.' : content}`}
        />
        <button
          disabled={user.id ? false : true}
          type="button"
          className="px-default py-1 text-white text-md font-bold bg-lightBlue"
          onClick={addComment}>
          등록
        </button>
      </div>
    </div>
  );
}

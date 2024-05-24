import { useAppSelector } from '@/hooks/useRedux';
import { CommentData } from '@/type/common';
import { TrashIcon } from '@heroicons/react/16/solid';

interface CommentProps {
  data: CommentData;
  deleteComment: (comment: CommentData) => void;
}

/** 2024/05/21 - each post comment data */
export default function Comment({ data, deleteComment }: CommentProps) {
  // check user login
  const user = useAppSelector(state => state.loginSlice);

  return (
    <ul
      className="grid grid-cols-comment items-center text-xs pt-default border-t border-gray"
      key={data.commentNumber}>
      {/* author */}
      <li className="flex gap-4">
        <h2 className="font-semibold">{data.author}</h2>
      </li>
      {/* comments */}
      <li className="w-full text-wrap">{data.comment}</li>
      {/* date */}
      <li className="text-right text-gray">{data.date}</li>
      {/* delete comment (check user) */}
      {user.id === data.author && (
        <li onClick={() => deleteComment(data)} className="text-lightGray hover:text-gray cursor-pointer">
          <TrashIcon width={12} height={12} />
        </li>
      )}
    </ul>
  );
}

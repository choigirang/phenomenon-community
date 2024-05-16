import { CommentData } from '@/type/common';

interface CommentProps {
  data: CommentData;
}

export default function Comment({ data }: CommentProps) {
  return (
    <div className="grid grid-cols-comment text-xs pt-default border-t border-gray">
      <div className="flex gap-4">
        <h2 className="font-semibold">{data.author}</h2>
        <span>{data.comment}</span>
      </div>
      <span className="text-right text-gray">{data.date}</span>
    </div>
  );
}

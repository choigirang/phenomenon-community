'use client';

import { PostType } from '@/type/community/type';
import Link from 'next/link';

interface PaginationProps {
  data: PostType[];
  totalPosts: number;
  postsPerPage?: number;
}

export default function Pagination({ data, totalPosts, postsPerPage = 10 }: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  console.log(data);

  return (
    <ul className="flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index} className="mr-2">
          <Link href={`/posts?page=${index + 1}`} className="bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded">
            {index + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
}

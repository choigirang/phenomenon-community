import Link from 'next/link';

interface PaginationProps {
  src: string;
  total: number;
  perPage?: number;
}

/** 2024/05/19 - pagination each page */
export default function Pagination({ src, total, perPage = 10 }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);

  return (
    <ul className="flex justify-center">
      {Array.from({ length: totalPages }, (_, index) => (
        <li key={index} className="mr-2">
          <Link
            href={`/${src}?page=${index + 1}`}
            className="bg-blue-500 hover:bg-blue-700 font-bold py-1 px-default rounded">
            {index + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
}

import { CATEGORY } from '@/constant/constant';
import Link from 'next/link';

export default function Category() {
  const category = Object.keys(CATEGORY);

  return (
    <div className="w-full min-h-[150px] text-xs border border-lightBlue p-default">
      <p className="border-b border-dashed border-darkBlue pb-default">카테고리</p>
      <ul className="flex gap-2 pt-default">
        {category.map(item => (
          <li key={item}>
            <Link href={`/posts?category=${CATEGORY[item]}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

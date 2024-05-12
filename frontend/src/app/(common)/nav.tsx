import Link from 'next/link';
import { HEADER_NAV } from '@/constant/constant';

export default function Nav() {
  return (
    <nav className="w-[100%] bg-blue text-white">
      <ul className="flex gap-5 text-sm p-container py-2">
        {Object.keys(HEADER_NAV).map(list => (
          <li key={list}>
            <Link href={`/${list}`} as={`/${list}`}>
              {HEADER_NAV[list]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import Link from 'next/link';
import Search from './search';
import Nav from './nav';

export default function Header() {
  return (
    <header className="flex flex-col">
      <div className="relative p-container py-4">
        <Link className="flex flex-col w-[100px] font-logo" href={'/'}>
          <span className="w-[80px] text-start text-blue">이게 왜</span>
          <span className="w-[80px] text-end text-lightBlue">진짠가요?</span>
        </Link>
        <Search />
      </div>
      <Nav />
    </header>
  );
}

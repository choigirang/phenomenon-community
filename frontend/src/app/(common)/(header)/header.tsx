import Link from 'next/link';
import Search from './search';
import Nav from './nav';

export default function Header() {
  return (
    <header className="flex flex-col">
      <div className="relative p-container py-4">
        <Link className="flex flex-col w-[100px] font-logo" href={'/'}>
          <h2 className="w-[80px] text-start text-blue">이게 왜</h2>
          <h1 className="w-[80px] text-end text-lightBlue">진짠가요?</h1>
        </Link>
        <Search />
      </div>
      <Nav />
    </header>
  );
}

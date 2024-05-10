import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div>
        <Link className="flex flex-col font-logo" href={'/'}>
          <span>이게 왜</span>
          <span>진짠가요?</span>
        </Link>
      </div>
    </header>
  );
}

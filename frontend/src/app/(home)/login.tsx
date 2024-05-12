import Link from 'next/link';
import NotLogin from './notLogin';

const STYLE = {
  container: 'justify-center items-center w-full p-3 text-xs border border-blue self-start',
};

export default function Login() {
  return (
    <div className={STYLE.container}>
      <NotLogin>
        <Link href={'/user/sign'}>회원가입</Link>
        <Link href={'/user/findId'}>아이디·비밀번호</Link>
      </NotLogin>
    </div>
  );
}

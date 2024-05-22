const PROCESS: { [key: string]: string } = { agree: '필수 동의', info: '정보 입력', complete: '회원 가입' };

export default function Process({ path }: { path: string }) {
  return (
    <ul className="flex justify-around w-full h-[50px]">
      {Object.keys(PROCESS).map(i => (
        <li
          key={i}
          className={`flex justify-center items-center w-full h-full bg-${
            path === i ? 'lightBlue text-white font-bold' : 'blue text-white'
          }`}>
          {PROCESS[i]}
        </li>
      ))}
    </ul>
  );
}

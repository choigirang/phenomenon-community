import { InputType } from '@/type/sign/type';

type EmailProps = {
  userMail: InputType;
  setUserMail: React.Dispatch<React.SetStateAction<InputType>>;
  inputAble: boolean;
  setInputAble: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const options: InputType = {
  google: 'google.com',
  hanmail: 'hanmail.com',
  hotmail: 'hatmail.com',
  daum: 'daum.com',
  kakao: 'kakao.com',
  yahoo: 'yahoo.com',
  nate: 'nate.com',
  user: '직접 입력',
};

export default function Email({ userMail, setUserMail, inputAble, setInputAble, children }: EmailProps) {
  // 이메일 입력 이벤트
  const mailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'mail') {
      setUserMail(prev => ({
        ...prev,
        mail: value,
      }));
    } else {
      setUserMail(prev => ({
        ...prev,
        domain: value,
      }));
    }
  };

  // select 이벤트
  const selectDirect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    function domainHandler(value: string) {
      if (value === '직접 입력') {
        setUserMail(prev => ({ ...prev, domain: '' }));
        setInputAble(true);
      } else {
        setUserMail(prev => ({ ...prev, domain: value }));
        setInputAble(false);
      }
    }
    domainHandler(value);
  };

  return (
    <div className="w-full grid grid-cols-info text-xs p-default">
      <label htmlFor="mail" className="font-bold">
        이메일
      </label>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          {/* 이메일 주소 */}
          <input
            type="text"
            onChange={mailHandler}
            name="mail"
            required
            className="border border-lightGray p-default outline-none"
          />
          <span>@</span>
          <input
            id="url"
            name="domain"
            value={userMail.domain}
            type="text"
            onChange={mailHandler}
            required
            disabled={!inputAble}
            className="border border-lightGray p-default outline-none"
          />
          {/* 도메인 선택 */}
          <select
            name="domain"
            value={userMail.domain}
            onChange={selectDirect}
            className="p-default border border-lightGray">
            <option defaultValue="" value="">
              이메일 선택
            </option>
            {Object.keys(options).map(opt => (
              <option value={options[opt]} key={options[opt]}>
                {options[opt]}
              </option>
            ))}
          </select>
        </div>
        <ul className="flex flex-col text-lightGray">
          <li>보안 코드는 식별 코드 찾기/비밀번호 재설정 및 탈퇴 시 사용되므로 발급을 부탁드립니다.</li>
          <li>인증 코드 발송 후 코드를 입력해 주시기 부탁드립니다.</li>
          <li>
            발급된 인증 코드는 개인 정보 보호를 위해 5분간만 유효합니다. 유효 시간이 경과할 경우 재발급을 받아주시기
            바랍니다.
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
}

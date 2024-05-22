/** Sign up input type */
export interface InputType {
  [key: string]: string;
}

/** 유효성 검사 */
export type ValidationItem = {
  name: string;
  check: (data: string) => boolean;
};

/** 아이디 상태값 */
export type CheckId = {
  userId: string;
  required: boolean;
};

export type CheckPass = {
  pass: string;
  required: boolean;
};

/** 비밀번호에 따른 유효성 타입 */
export type PassInputData = {
  word?: boolean;
  length?: boolean;
  validation?: boolean;
};

/** 닉네임 */
export type CheckName = {
  name: string;
  checkName: boolean;
};

/** 보안 코드 */
export interface AxiosSecurityCode {
  code: string;
  userCode: string;
}

/** 보안 코드 확인 */
export type CheckSecurityType = {
  agree: boolean;
  compareSecurityCode: boolean;
  errInfo: string;
  errCode: string;
};

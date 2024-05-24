/** Sign up input type */
export interface InputType {
  [key: string]: string;
}

/** validation name */
export type ValidationItem = {
  name: string;
  check: (data: string) => boolean;
};

/** check id type */
export type CheckId = {
  userId: string;
  required: boolean;
};
/** check password type */
export type CheckPass = {
  pass: string;
  required: boolean;
};
/** check validation about password */
export type PassInputData = {
  word?: boolean;
  length?: boolean;
  validation?: boolean;
};
/** nick name type */
export type CheckName = {
  name: string;
  checkName: boolean;
};
/** security code type */
export interface AxiosSecurityCode {
  code: string;
  userCode: string;
}
/** check server security code with user code */
export type CheckSecurityType = {
  agree: boolean;
  compareSecurityCode: boolean;
  errInfo: string;
  errCode: string;
};

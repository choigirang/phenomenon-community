import { UserType } from '@/types/type';

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';

export interface SetLoggedInUserAction {
  type: typeof SET_LOGGED_IN_USER;
  payload: UserType;
}

export const setLoggedInUser = (userData: UserType): SetLoggedInUserAction => ({
  type: SET_LOGGED_IN_USER,
  payload: userData,
});

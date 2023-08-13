import { UserType } from '@/types/type';
import { SET_LOGGED_IN_USER, SetLoggedInUserAction } from '../actions/user';

interface UserState {
  id: string;
  name: string;
  mail: string;
  login: boolean;
}

const initialState: UserState = {
  id: '',
  name: '',
  mail: '',
  login: false,
};

type UserActionTypes = SetLoggedInUserAction; // 다른 액션들도 있다면 union(|)으로 추가

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        mail: action.payload.mail,
        login: true,
      };
    default:
      return state;
  }
};

export default userReducer;

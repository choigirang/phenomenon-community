// reducers.js
import { UserAction } from '@/types/type';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/user';

const initialState = {
  user: {
    id: '',
    name: '',
    mail: '',
    login: false,
  },
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          mail: action.payload.mail,
          login: true,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          ...initialState.user,
        },
      };
    default:
      return state;
  }
};

export default userReducer;

import { InitialState, UserAction } from '@/types/type';
import { LOGIN_SUCCESS, LOGOUT } from '../actions/user';

const initialState: InitialState = {
  user: {
    id: '',
    name: '',
    mail: '',
    super: false,
    login: false,
    likes: [],
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
          super: action.payload.super,
          login: true,
          likes: action.payload.likes,
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

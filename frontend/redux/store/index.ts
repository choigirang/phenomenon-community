import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/loginData';

const rootReducer = combineReducers({
  user: userReducer,
  // 다른 리듀서도 추가할 수 있음
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;

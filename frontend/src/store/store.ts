import { createStore, combineReducers, Action } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { PayloadAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import loginSlice from './modules/loginSlice';

const reducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === HYDRATE) {
    // SSR 작업 수행 시 HYDRATE 라는 액션을 통해서 서버의 스토어와 클라이언트의 스토어를 합쳐주는 작업을 수행
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    loginSlice: loginSlice.reducer,
  })(state, action);
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

const makeStore = () => {
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

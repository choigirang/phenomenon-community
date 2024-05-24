import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers, Action } from 'redux';
import { PayloadAction, ThunkAction, configureStore } from '@reduxjs/toolkit';
import loginSlice from './modules/loginSlice';

const reducer = (state: any, action: PayloadAction<any>) => {
  if (action.type === HYDRATE) {
    // for ssr
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

import { createStore } from 'redux';
import userReducer from './../reducers/loginData';

const store = createStore(userReducer);

export default store;

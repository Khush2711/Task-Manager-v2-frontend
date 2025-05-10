import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/user';
import taskReducer from './Slices/task';

const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  },
});

export default store;

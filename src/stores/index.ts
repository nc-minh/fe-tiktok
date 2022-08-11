import { configureStore } from '@reduxjs/toolkit';

import counterReducer from 'app/pages/Home/slice';
import detectLoginReducer from 'app/components/ProfileHeaderBase/slice';
import mediaOfLayoutFullReducer from 'app/components/PostList/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    detectLogin: detectLoginReducer,
    mediaOfLayoutFull: mediaOfLayoutFullReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

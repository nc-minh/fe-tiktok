import { configureStore } from '@reduxjs/toolkit';

import counterReducer from 'app/pages/Home/slice';
import detectLoginReducer from 'app/components/ProfileHeaderBase/slice';
import mediaOfLayoutFullReducer from 'app/components/PostList/slice';
import globalStateReducer from 'app/layouts/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    detectLogin: detectLoginReducer,
    mediaOfLayoutFull: mediaOfLayoutFullReducer,
    globalState: globalStateReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

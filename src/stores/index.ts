import { configureStore } from '@reduxjs/toolkit';

import counterReducer from 'app/pages/Home/slice';
import reloadAvatarReducer from 'app/containers/ProfileHeaderUpload/slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    reloadAvatar: reloadAvatarReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

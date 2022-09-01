import { createSlice } from '@reduxjs/toolkit';
import { SnackbarGlobal } from 'types/Common';
import { UserInfo } from 'types/User';

export interface GlobalState {
  user: UserInfo;
  refetch: boolean;
  snackbarGlobal: SnackbarGlobal;
}

const initialState: GlobalState = {
  user: {
    _id: '',
    fullname: '',
    username: '',
    avatar: '',
    bio: '',
    tick: false,
    followings_count: 0,
    followers_count: 0,
    isFollow: false,
    likes_count: 0,
    website_url: '',
    social_network: [],
    created_at: '',
    updated_at: '',
  },
  refetch: false,
  snackbarGlobal: {
    status: false,
    message: '',
    type: 'info',
  },
};

export const globalStateSlice = createSlice({
  name: 'globalState',
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    snackbarAction: (state, action) => {
      state.snackbarGlobal = action.payload;
    },
  },
});

export const globalStateActions = globalStateSlice.actions;

export default globalStateSlice.reducer;

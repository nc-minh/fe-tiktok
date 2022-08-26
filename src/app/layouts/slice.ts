import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from 'types/User';

export interface UserLogin {
  user: UserInfo;
  refetch: boolean;
}

const initialState: UserLogin = {
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getRefetch: (state, action) => {
      state.refetch = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;

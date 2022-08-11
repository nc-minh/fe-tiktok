import { createSlice } from '@reduxjs/toolkit';

import { ResponsePostType } from 'types/Post';
import { UserInfo } from 'types/User';

export interface MediaOfLayoutFullType {
  mediaOfLayoutFull: {
    post: ResponsePostType[];
    user: UserInfo;
    mode?: string;
    next?: boolean;
  };
}

const initialState: MediaOfLayoutFullType = {
  mediaOfLayoutFull: {
    post: [],
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
    },
    mode: '', //random | profile | media
    next: false,
  },
};

export const mediaOfLayoutFullSlice = createSlice({
  name: 'mediaOfLayoutFull',
  initialState: initialState,
  reducers: {
    assignMedia: (state, action) => {
      // if (action.payload.mode === 'random' && action.payload.next === false) {
      //   state.mediaOfLayoutFull = action.payload;
      // } else if (
      //   action.payload.mode === 'random' &&
      //   action.payload.next === true
      // ) {
      //   let postArr = state.mediaOfLayoutFull.post;
      //   let newPayload = {
      //     post: [...postArr, ...action.payload.post],
      //     user: action.payload.user,
      //     mode: action.payload.mode, //random | profile | media
      //     next: action.payload.next,
      //   };
      //   state.mediaOfLayoutFull = newPayload;
      // }
      state.mediaOfLayoutFull = action.payload;
      console.log(action.payload);
    },
  },
});

export const mediaOfLayoutFullActions = mediaOfLayoutFullSlice.actions;

export default mediaOfLayoutFullSlice.reducer;

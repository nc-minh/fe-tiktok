import { createSlice } from '@reduxjs/toolkit';

import { ResponsePostType } from 'types/Post';
import { UserInfo } from 'types/User';

export interface MediaOfLayoutFullType {
  mediaOfLayoutFull: {
    data: {
      post: ResponsePostType[];
      user: UserInfo;
    };
    mode?: string;
    next?: boolean;
  };
}

const initialState: MediaOfLayoutFullType = {
  mediaOfLayoutFull: {
    data: {
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
      state.mediaOfLayoutFull = action.payload;
      console.log(action.payload);
    },
  },
});

export const mediaOfLayoutFullActions = mediaOfLayoutFullSlice.actions;

export default mediaOfLayoutFullSlice.reducer;

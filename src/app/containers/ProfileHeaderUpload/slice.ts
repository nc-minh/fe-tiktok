import { createSlice } from '@reduxjs/toolkit';

export interface reloadAvatarType {
  avatarStatus: boolean;
}

const initialState: reloadAvatarType = {
  avatarStatus: false,
};

export const reloadAvatarSlice = createSlice({
  name: 'reloadAvatar',
  initialState: initialState,
  reducers: {
    reloadAvatar: (state, action) => {
      state.avatarStatus = action.payload;
    },
  },
});

export const reloadAvatarActions = reloadAvatarSlice.actions;

export default reloadAvatarSlice.reducer;

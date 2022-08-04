import { createSlice } from '@reduxjs/toolkit';

export interface detectLoginType {
  detectLogin: boolean;
}

const initialState: detectLoginType = {
  detectLogin: false,
};

export const detectLoginSlice = createSlice({
  name: 'detectLogin',
  initialState: initialState,
  reducers: {
    detectLogin: (state, action) => {
      state.detectLogin = action.payload;
    },
  },
});

export const detectLoginActions = detectLoginSlice.actions;

export default detectLoginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface incrementType {
  increment: number;
}

const initialState: incrementType = {
  increment: 0,
};

export const incrementSlice = createSlice({
  name: 'increment',
  initialState: initialState,
  reducers: {
    counter: (state, action) => {
      state.increment = state.increment + action.payload;
    },
  },
});

export const incrementActions = incrementSlice.actions;

export default incrementSlice.reducer;

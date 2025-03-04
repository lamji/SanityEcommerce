import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: false,
  message: 'Loading...'
};

const spinnerSlice = createSlice({
  name: 'spinner',
  initialState,
  reducers: {
    showSpinner: (state, action) => {
      state.isVisible = true;
      state.message = action.payload || 'Loading...';
    },
    hideSpinner: (state) => {
      state.isVisible = false;
      state.message = 'Loading...';
    }
  }
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer; 
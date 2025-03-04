import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'Dashboard',
  sorting: {
    field: 'name',
    direction: 'asc'
  }
};

export const adminSlice = createSlice({
  name: 'activeAdmin',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSorting: (state, action) => {
      const { field, direction } = action.payload;
      state.sorting = { field, direction };
    }
  }
});

export const { setActiveTab, setSorting } = adminSlice.actions;
export default adminSlice.reducer; 
import { createSlice } from '@reduxjs/toolkit';
import * as asyncActions from './products.asyncActions';

const initialState = {
  allProducts: [],
  filter: '',
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // synchronous actions
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    // asynchronous actions
    [asyncActions.fetchAllProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export default slice;

export const { name, actions, reducer } = slice;

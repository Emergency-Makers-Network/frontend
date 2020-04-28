import slice from './products.slice';

export const selectSlice = (state) => state[slice.name];

export const selectAllProducts = (state) => selectSlice(state).allProducts;

export const selectProductsFilter = (state) => selectSlice(state).filter;

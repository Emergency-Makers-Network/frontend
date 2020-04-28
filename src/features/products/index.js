import Products from './Products';
import * as selectors from './products.selectors';
import * as asyncActions from './products.asyncActions';
import slice from './products.slice';

export const {
    name,
    actions: { updateFilter },
    reducer,
} = slice;

export const { fetchAllProducts } = asyncActions;

// we prefix all selectors with the the "select" prefix
export const { selectAllProducts, selectProductsFilter } = selectors;

// we export the component most likely to be desired by default
export default Products;

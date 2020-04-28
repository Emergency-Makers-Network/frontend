import { createAsyncThunk } from '@reduxjs/toolkit';
import doAsync from '../../infrastructure/doAsync';

export const fetchAllProducts = createAsyncThunk(
    'products/getAll',
    async ({ useCaching, noBusySpinner } = {}, thunkArgs) =>
        await doAsync({
            url: 'products',
            useCaching,
            noBusySpinner,
            successMessage: 'Products loaded',
            errorMessage: 'Unable to load products. Please try again later.',
            stubSuccess: ['Dummy item 1', 'Dummy item 2'],
            ...thunkArgs,
        }),
);

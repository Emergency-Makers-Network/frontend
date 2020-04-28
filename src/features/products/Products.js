import React, { useState } from 'react';
import useProductsQuery from './products.queries';
import { useDeleteProductMutation, useUpdateProductMetadataMutation } from './products.mutations';
import BusyIndicator from '../../widgets/busyIndicator';

// https://ultimatecourses.com/blog/graphql-client-side-integration-with-apollo-hooks
const Products = () => {
    const { data, loading, refetch } = useProductsQuery();
    const mutate = useDeleteProductMutation();

    if (loading)
        return (
            <BusyIndicator>
                <h2>Products</h2>
            </BusyIndicator>
        );
    if (!data || !data.products) return null;
    const { products } = data;
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products &&
                    products.map((item) => (
                        <li key={item.id}>
                            {item.name} <button onClick={() => refetch()}>Reload</button>
                            <button onClick={() => mutate(item.id)}>Delete</button>
                            <UpdateName product={item} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const UpdateName = ({ product }) => {
    const updateName = useUpdateProductMetadataMutation();
    const [name, setName] = useState(product.name);

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => updateName({ id: product.id, name })}>Change Name</button>
        </div>
    );
};

export default Products;

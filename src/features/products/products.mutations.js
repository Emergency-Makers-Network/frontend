import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { getAllProducts } from './products.queries';

export const deleteProductMutation = gql`
    mutation DeleteProduct($input: ProductIdInput!) {
        deleteProduct(input: $input)
    }
`;

export const useDeleteProductMutation = () => {
    const [mutate] = useMutation(deleteProductMutation);

    return ({ id }) =>
        mutate({
            variables: { input: { id } },
            notifyOnNetworkStatusChange: true,
            update: (store) => {
                const data = store.readQuery({
                    query: getAllProducts,
                });

                store.writeQuery({
                    query: getAllProducts,
                    data: {
                        products: data.products.filter((currentProduct) => currentProduct.id !== id),
                    },
                });
            },
        });
};

export const updateProductMetadataMutation = gql`
    mutation UpdateProductMetadata($input: ProductInput!) {
        updateProductMetadata(input: $input)
    }
`;
export const useUpdateProductMetadataMutation = () => {
    const [mutate] = useMutation(updateProductMetadataMutation);

    return ({ id, title, name, description, imageUrl }) => {
        return mutate({
            variables: { input: { id, title, name, description, image_url: imageUrl } },
        });
    };
};

export default {
    deleteProductMutation,
    useDeleteProductMutation,
    updateProductMetadataMutation,
    useUpdateProductMetadataMutation,
};

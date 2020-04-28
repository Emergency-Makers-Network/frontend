import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { getAllProducts } from './products.queries';

export const deleteProductMutation = gql`
    mutation DeleteProduct($id: Number!) {
        deleteProduct(id: $id)
    }
`;

export const useDeleteProductMutation = () => {
    const [deleteProduct] = useMutation(deleteProductMutation);

    return (title) => {
        return deleteProduct({
            variables: { title },
            notifyOnNetworkStatusChange: true,
            update: (store) => {
                const data = store.readQuery({
                    query: getAllProducts,
                });

                store.writeQuery({
                    query: getAllProducts,
                    data: {
                        products: data.products.filter((currentProduct) => currentProduct.title !== title),
                    },
                });
            },
        });
    };
};

export const updateProductMetadataMutation = gql`
    mutation UpdateProductMetadata($input: UpdateProductInput!) {
        updateProductMetadata(input: $input) {
            id
            name
            description
            image_url
        }
    }
`;
export const useUpdateProductMetadataMutation = () => {
    const [mutate] = useMutation(updateProductMetadataMutation);

    return ({ id, title, name, description, imageUrl }) => {
        return mutate({
            variables: { input: { id, title, name, description, imageUrl } },
        });
    };
};

export default {
    deleteProductMutation,
    useDeleteProductMutation,
    updateProductMetadataMutation,
    useUpdateProductMetadataMutation,
};

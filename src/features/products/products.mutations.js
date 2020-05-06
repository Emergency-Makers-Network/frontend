import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { getAllProducts } from './products.queries';

export const deleteProductMutation = gql`
  mutation DeleteProduct($input: ProductIdInput!) {
    deleteProduct(input: $input) {
      id
      name
      description
      imageUrl
      price
    }
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
            products: data.products.filter(
              (currentProduct) => currentProduct.id !== id
            ),
          },
        });
      },
    });
};

export const updateProductMutation = gql`
  mutation UpdateProduct($input: ProductInput!) {
    updateProduct(input: $input) {
      id
      name
      description
      imageUrl
      price
    }
  }
`;
export const useUpdateProductMutation = () => {
  const [mutate] = useMutation(updateProductMutation);

  return ({ id, title, name, description, imageUrl, price }) => {
    return mutate({
      variables: {
        input: { id, title, name, description, imageUrl, price },
      },
    });
  };
};

export default {
  deleteProductMutation,
  useDeleteProductMutation,
  updateProductMutation,
  useUpdateProductMutation,
};

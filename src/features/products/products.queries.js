import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const getAllProducts = gql`
  query Products {
    products {
      id
      name
      description
      imageUrl
      price
      createdAt
    }
  }
`;

export default () => useQuery(getAllProducts);

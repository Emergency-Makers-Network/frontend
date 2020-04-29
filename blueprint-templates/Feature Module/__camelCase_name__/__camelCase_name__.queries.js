import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

export const query = gql`
  query {{pascalCase name}} {
    {{camelCase name}} {
      id
    }
  }
`;

export default () => useQuery(query);

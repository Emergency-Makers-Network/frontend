import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { query as {{camelCase name}} } from './{{camelCase name}}.queries';

export const deleteMutation = gql`
  mutation Delete{{pascalCase name}}($id: Number!) {
    delete{{pascalCase name}}(id: $id) {
      id
    }
  }
`;

export const useDelete{{pascalCase name}} = () => {
  const [mutate] = useMutation(deleteMutation);

  return title => {
    return mutate({
      variables: { id },
      update: store => {
        const data = store.readQuery({
          query: {{camelCase name}}Query,
        });

        store.writeQuery({
          query: {{camelCase name}}Query,
          data: {
            {{camelCase name}}: data.{{camelCase name}}.filter(
              current{{ $itemName }} => current{{ $itemName }}.title !== title,
            ),
          },
        });
      },
    });
  };
}

export const update{{camelCase name}}MetadataMutation = gql`
    mutation Update{{camelCase name}}Metadata($input: Update{{camelCase name}}Input!) {
        update{{camelCase name}}Metadata(input: $input) {
            id
            name
            description
            image_url
        }
    }
`;
export const useUpdate{{camelCase name}}Metadata = () => {
    const [mutate] = useMutation(update{{camelCase name}}MetadataMutation);

    return ({ id, title, name, description, imageUrl }) => {
        return mutate({
            variables: { input: { id, title, name, description, imageUrl } },
        });
    };
};

export default {
  delete{{camelCase name}}Mutation,
  useDelete{{camelCase name}}Mutation,
  update{{camelCase name}}MetadataMutation,
  useUpdate{{camelCase name}}MetadataMutation,
};

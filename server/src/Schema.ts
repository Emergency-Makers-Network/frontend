import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './ResolverMap';
import { GraphQLSchema } from 'graphql';
import { gql } from 'apollo-server';

// Scalar typeDefs
import {
	DateTimeResolver,
	DateTimeTypeDefinition,
	PhoneNumberTypeDefinition,
	PhoneNumberResolver,
	EmailAddressTypeDefinition,
	EmailAddressResolver
} from 'graphql-scalars';

const typeDefs = gql`
type Query {
  getPPERequest(id: String!): PPERequest
}

type Mutation {
	setPPERequest(input: PPEInput): String!
}

type PPERequest {
	id: Int!
	created_at: DateTime!
	updated_at: DateTime!
	first_name: String!
	last_name: String!
	phone: PhoneNumber!
	email: EmailAddress!
}

input PPEInput {
	first_name: String!
	last_name: String!
	phone: PhoneNumber!
	email: EmailAddress!
}
`;

const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [
		DateTimeTypeDefinition,
		PhoneNumberTypeDefinition,
		EmailAddressTypeDefinition,
		{ ...typeDefs }
	],
	resolvers: [
		{ DateTime: DateTimeResolver },
		{ PhoneNumber: PhoneNumberResolver },
		{ EmailAddress: EmailAddressResolver },
		{ ...resolvers }
	]
});

export default schema;
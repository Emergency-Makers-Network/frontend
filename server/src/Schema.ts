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
 	getOrder(id: String!): Order
 	products: [Product]
}

type Mutation {
	setOrder(input: OrderInput): String
}

type Order {
	id: Int!
	created_at: DateTime!
	updated_at: DateTime!
	first_name: String!
	last_name: String!
	phone: PhoneNumber!
	email: EmailAddress!
	address_id: String!
}

type Product {
	id: Int!
	name: String!
	description: String!
	image_url: String!
}

type OrderLine {
	id: Int!
	product_id: String!
	qty: Int!
}

input OrderInput {
	first_name: String!
	last_name: String!
	phone: PhoneNumber!
	email: EmailAddress!
	address_id: String!

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
// Emergency Makers Network Server

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import compression from 'compression';
import cors from 'cors';
import schema from './Schema';

const server = new ApolloServer({ schema: schema });

const app = express();
server.applyMiddleware({ app });

app.use('*', cors);
app.use(compression());

app.listen({ port: 3000 }, () => console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`));

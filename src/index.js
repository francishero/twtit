/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools'
import {createServer} from 'http'
import './config/db' // to connect and run mongodb 
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import constants from './config/constants'

const app = express(); // create an instance of express

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})



app.use(bodyParser.json()); // add body-parser as the json parser middleware

// hook up express and graphql IDE
app.use('/graphiql', graphiqlExpress({
	endpointURL: constants.GRAPHQL_PATH
}))

// now we setup the graphql 
app.use(constants.GRAPHQL_PATH, graphqlExpress({
	schema
}))

const graphQlServer = createServer(app)

graphQlServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen on port: ${constants.PORT}`);
  }
});

import bodyParser from 'body-parser';
import morgan from 'morgan'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools'
import { decodeToken } from '../services/auth'
import constants from './constants'
import typeDefs from '../graphql/schema'
import resolvers from '../graphql/resolvers'


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

async function auth (req, res, next) {
  try {
    const token = req.headers.authorization 
    if (token != null) {
      const user = await decodeToken(token)
      req.user = user 
    } else {
      req.user = null
    }
    return next()
  } catch(e) {
    throw e 
  }
}

export default app => {

app.use(bodyParser.json()); // add body-parser as the json parser middleware
app.use(morgan('dev'))
 app.use(auth) // defined above 
// hook up express and graphql IDE
app.use('/graphiql', graphiqlExpress({
  endpointURL: constants.GRAPHQL_PATH
}))

// now we setup the graphql 
app.use(constants.GRAPHQL_PATH, 
  graphqlExpress( req => ({
    schema, 
    context: {
      user: req.user // add verified user to the context so we can have access 
    }
  })))

}
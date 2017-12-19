export default `
scalar Date
  type Status {
    message: String
  }

  type Tweet {
    _id: ID!,
    text: String!
    user: User!
    favoriteCount: Int!
    createdAt: Date!
    updatedAt: Date!
  }
  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String 
    avatar: String 
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
     _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String 
    avatar: String 
    createdAt: Date!
    updatedAt: Date!
  }

  type Auth {
    token: String!
  }

  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]
    me: Me 
  }
  
  type Mutation {
    createTweet(text: String!): Tweet,
    updateTweet(_id: ID!, text:String): Tweet,
    deleteTweet(_id: ID!): Status
    signup(email: String!, fullName: String!, avatar: String, username: String, password: String! ): Auth!
    login(email: String!, password: String!): Auth!
  }


  schema {
    query: Query,
    mutation: Mutation
  }
`
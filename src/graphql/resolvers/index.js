
import GraphQlDate from 'graphql-date'
import tweetResolvers from './tweet-resolver'
import userResolvers from './user-resolver'

export default {
  // grahql when it sees a Date dataType it will look for it in schema 
  Date: GraphQlDate,
	// not function calls !!!
  Query: {
  	getTweet: tweetResolvers.getTweet,
    getTweets: tweetResolvers.getTweets,
     me: userResolvers.me
  },
  Mutation: {
  	createTweet: tweetResolvers.createTweet,
  	updateTweet: tweetResolvers.updateTweet,
  	deleteTweet: tweetResolvers.deleteTweet,
    signup: userResolvers.signup,
    login: userResolvers.login

  }
}
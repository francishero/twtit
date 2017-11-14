
import GraphQlDate from 'graphql-date'
import tweetResolvers from './tweet-resolver'

export default {
  // grahql when it sees a Date dataType it will look for it in schema 
  Date: GraphQlDate,
	// not function calls !!!
  Query: {
  	getTweet: tweetResolvers.getTweet,
    getTweets: tweetResolvers.getTweets 
  },
  Mutation: {
  	createTweet: tweetResolvers.createTweet,
  	updateTweet: tweetResolvers.updateTweet,
  	deleteTweet: tweetResolvers.deleteTweet
  }
}
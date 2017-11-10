import tweetResolvers from './tweet-resolver'

export default {
  Query: {
    getTweets: tweetResolvers.getTweets()
  }
}
import Tweet from '../../models/Tweet'

export default {
  // this is the resolver to get all tweets from the database 
  getTweets: () => Tweet.find({})
}
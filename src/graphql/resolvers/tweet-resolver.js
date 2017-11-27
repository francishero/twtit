import Tweet from '../../models/Tweet'

export default {
	// get a single tweet from the database using the id  
  getTweet: (_, { _id }) => Tweet.findById(_id),
  // this is the resolver to get all tweets from the database 
  getTweets:  () => Tweet.find({}).sort({ createdAt: -1}),
  // create a tweet using the data user passes in (args)
  createTweet: (_, args) => Tweet.create(args),
  // update a tweet using the tweets _id and then gather all the params 
  updateTweet: (_, { _id, ...rest }) => Tweet.findOneAndUpdate(_id, rest, { new: true}),
  // find a tweet by _id and delete it, return a message 
  deleteTweet: async (_, { _id }) => {
    try {
      await Tweet.findOneAndRemove(_id)
      return {
        message: 'Tweet deleted successfully'
      }
    } catch(e) {
      throw e
    }
  }
}


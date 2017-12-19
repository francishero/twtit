import Tweet from '../../models/Tweet'
import { requireAuth } from '../../services/auth'

export default {
	// get a single tweet from the database using the id  
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      return   Tweet.findById(_id)
    } catch(e) {
      throw new Error('You cant get a tweet without authentication')
    }
  },
  // this is the resolver to get all tweets from the database 
  getTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user)
      return Tweet.find({}).sort({ createdAt: -1})
    } catch(e) {
      throw new Error('you cant get all tweets with authentication')
    }
  },
  // create a tweet using the data user passes in (args)
  createTweet:async  (_, args, { user }) => {
    try {
      await requireAuth(user)
      return Tweet.create(args)
    } catch(e) {
      throw new Error('you cant create a tweet without authentication')
    }
  },
  // update a tweet using the tweets _id and then gather all the params 
  updateTweet:async  (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user)
      return Tweet.findOneAndUpdate(_id, rest, { new: true})
    } catch(e) {
      throw new Error('you cant update a tweet without authentication')
    }
  },
  // find a tweet by _id and delete it, return a message 
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      await Tweet.findOneAndRemove(_id)
      return {
        message: 'Tweet deleted successfully'
      }
    } catch(e) {
      throw new Error('you cant delete a tweet without authentication')
    }
  }
}


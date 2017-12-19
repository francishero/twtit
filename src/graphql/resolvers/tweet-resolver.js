import Tweet from '../../models/Tweet'
import { requireAuth } from '../../services/auth'

export default {
  getUserTweets: async (_, args, { user }) => {
     try {
      await requireAuth(user)
      return Tweet.find({ user: user._id  }).sort({ createdAt: -1})
    } catch(e) {
      throw new Error('you cant get all tweets with authentication')
    }
  },
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
      return Tweet.create({ ...args, user: user._id})
    } catch(e) {
      throw new Error('you cant create a tweet without authentication')
    }
  },
  // update a tweet using the tweets _id and then gather all the params 
  updateTweet:async  (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user)
      const tweet = await Tweet.findOne({ _id, user: user._id })
      if(!tweet) {
        throw new Error('Not Found')
      }
      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value 
      })

      return tweet.save() 

    } catch(e) {
      throw new Error('you cant update a tweet without authentication')
    }
  },
  // find a tweet by _id and delete it, return a message 
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      const tweet = await Tweet.findOne({ _id, user: user._id })
      if(! tweet) {
        throw new Error('Not Found')
      }
      await tweet.remove()
      return {
        message: 'Tweet deleted successfully'
      }
    } catch(e) {
      throw new Error('you cant delete a tweet without authentication')
    }
  }
}


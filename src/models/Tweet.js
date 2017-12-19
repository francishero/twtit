import mongoose, { Schema } from 'mongoose';

const TweetSchema = new Schema({
  text: {
  	type: String,
  	minlength: [5, 'text must be longer'],
  	maxlength: [144, 'text is too long']
  },
  user: {
  	type: Schema.Types.ObjectId,
  	ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, {
	timestamps: true
});

export default mongoose.model('Tweet', TweetSchema);
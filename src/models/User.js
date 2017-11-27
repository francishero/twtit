import mongoose, { Schema } from 'mongoose'
import { hashSync, compareSync } from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  avatar: String,
  password: String,
  email: String
},
{
  timestamps: true 
})

// we define a before save hook --> hash the password before saving 

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password)
    return next() 
  }
  return next() // password was not modified
})
userSchema.methods = {
  hashPassword(password) {
    return hashSync(password,10)
  },

  authenticateUser(password) {
    return compareSync(password, this.password)
  }
}
export default mongoose.model('User', userSchema)
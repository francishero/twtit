import User from '../../models/User'
import { requireAuth } from '../../services/auth'

export default {

  // me is the user himself 
  me: async (_, args, { user }) => {
    
    try {
     const me = await requireAuth(user)
      return me
    } catch(e) {
      throw e
    }
  }, 

  signup:  async (_, {fullName, ...rest}) => {
    const [firstName, ...lastName] = fullName.split(' ')
    const user = await User.create({
      firstName,
      lastName,
      ...rest 
    })
    return {
      token: user.createToken() // we return an object with a token 
    }
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ email })
    if(!user) {
      throw new Error('User does not exist')
    }
    if(!user.authenticateUser(password)) {
      throw new Error('Password does not match')
    }

    return {
      token: user.createToken()
    }
  }
}



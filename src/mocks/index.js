import faker from 'faker';
import Tweet from '../models/Tweet';
import User from '../models/User'

const TWEETS_TOTAL = 3;
const USER_TOTAL = 3;

export default async () => {
  try {
    // remove all the tweets when we rerun
    await Tweet.remove();
    await User.remove()

    await Array.from({ length: USER_TOTAL }).forEach(async (_, i) => {
     const user = await User.create({
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123'
      }); 

       // create an array of size 10 and populate it with fake tweets
    await Array.from({ length: TWEETS_TOTAL }).forEach(async () => {
      await Tweet.create({
        text: faker.lorem.sentence(),
        user: user._id
      })
    });

    })
   
  } catch (error) {
    throw error;
  }
}



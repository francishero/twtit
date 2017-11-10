import faker from 'faker';

import Tweet from '../models/Tweet';

const TWEETS_TOTAL = 10;

export default async () => {
  try {
    // remove all the tweets when we rerun
    await Tweet.remove();

    // create an array of size 10 and populate it with fake tweets
    await Array.from({ length: TWEETS_TOTAL }).forEach(async () => {
      await Tweet.create({
        text: faker.lorem.paragraphs(1),
      })
    });
  } catch (error) {
    throw error;
  }
}
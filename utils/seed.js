const connection = require('../config/connection');
const { User, Thought} = require('../models');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];
  const thoughts = [];

 

    const first = 'Cody'
    const last = 'Kietzman'
    const email = 'ckietzm2@gmail.com'
    const thoughtText = "I like it"

    users.push({
      first,
      last,
      email,
    });

    thoughts.push({
      thoughtText
    })
  

  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  // loop through the saved videos, for each video we need to generate a video response and insert the video responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

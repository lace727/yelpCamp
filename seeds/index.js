const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected!');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //!YOUR AUTHOR ID
      author: '637ed236fee2097d016d116f',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,

      description: 'A beautiful campsite',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dqrntuj73/image/upload/v1672798906/YelpCamp/g5xqgc3krx2a2lvjfzom.jpg',
          filename: 'YelpCamp/g5xqgc3krx2a2lvjfzom',
        },
        {
          url: 'https://res.cloudinary.com/dqrntuj73/image/upload/v1672798906/YelpCamp/l4ffx7ip6tvdznre6kwd.jpg',
          filename: 'YelpCamp/l4ffx7ip6tvdznre6kwd',
        },
        {
          url: 'https://res.cloudinary.com/dqrntuj73/image/upload/v1672798907/YelpCamp/rbthqva67ivlbrkzm2dc.webp',
          filename: 'YelpCamp/rbthqva67ivlbrkzm2dc',
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});

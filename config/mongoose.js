const mongoose = require('mongoose');
const { mongo } = require('./env');

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

module.exports = {
  connect: () => {
    mongoose.connect(mongo.host, {
      keepAlive: 1,
      useMongoClient: true,
    });
    return mongoose.connection;
  },
};

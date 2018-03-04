require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongo: {
    host: `${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`,
  },
};

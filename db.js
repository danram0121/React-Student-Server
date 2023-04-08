// found solution without using mongoose through this video
// https://youtu.be/gGNquGHqpNI

const { MongoClient } = require("mongodb");
var config = require("./config");

const uri = process.env.MONGODB_URI; // set uri to Heroku value

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};

// found solution without using mongoose through this video
// https://youtu.be/gGNquGHqpNI

const { MongoClient } = require('mongodb')
var config = require('./config');

const uri = "mongodb+srv://" + config.db.user + ":" + config.db.pass + "@" + config.db.host + "/" + config.db.name + "?retryWrites=true&w=majority";

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}
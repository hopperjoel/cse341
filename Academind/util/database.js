const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://hopperjoel:Huevitos132@cluster0.fvl7e.mongodb.net/shop?retryWrites=true&w=majority";

let _db;
/*
const { MongoClient } = require('mongodb');

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

const mongoConnect = callback => {
    MongoClient.connect(uri)
    .then(client => {
        console.log("Connected");
        _db = client.db()
        callback(client);
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
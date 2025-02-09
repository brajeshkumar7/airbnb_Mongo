const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const URL = 'mongodb+srv://root:wucmetmmiawtg@indicluster.jvawg.mongodb.net/?retryWrites=true&w=majority&appName=indiCluster'

let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(URL)
        .then(client => {
            // console.log(client);
            _db = client.db('airbnb');
            callback();
        })
        .catch(error => {
            console.log('error occured while connecting to database', error);
        })
}

const getDB = () => {
    if (!_db) {
        throw new Error('not connected to databse');
    }
    else {
        return _db;
    }
}

exports.getDB = getDB;
exports.mongoConnect = mongoConnect;
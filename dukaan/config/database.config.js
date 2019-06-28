// module.exports = {
//     url: 'mongodb://localhost:3000/admin/item'
// }

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://capricornpopcorn:admin@cluster0-3cukf.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
MongoClient.connect(uri,{ useNewUrlParser: true }, (err, client) => {
    console.time('mongodb');
    if (err) throw err;
    console.log('Connected successfully to MongoDB server');
    fetchFromAPI((err, data) => {
        if (err) throw err;
        let db = client.db('db01');
        const collection = db.collection('value');

// const http = require('http')
// const url = require('url')
// const querystring = require('querystring')
// const { add, sub } = require('./calcu')

// http.createServer(

//     function (req, res) {

//         const reqURL = req.url

//         const urlParse = url.parse(req.url)
//         console.log(urlParse.query);

//         const querystringparse = querystring.parse(urlParse.query)
//         console.log(querystringparse);

//         const num1 = querystringparse.num1;
//         const num2 = querystringparse.num2;

//         if (reqURL.includes('/add')) {
//             res.write(add(num1, num2));
//         } else if (reqURL.includes('/sub')) {
//             res.write(sub(num1, num2));
//         }
//         res.end();
//     }

// ).listen(8080)

const express = require('express');
const mongoose = require('mongoose');
// const { MongoClient, ObjectId } = require('mongodb');
// const calcu = require('./calcu')
const app = express();

app.use(express.json())

const main = async (req, res) => {
    await mongoose.connect('mongodb://localhost:27017/Abcd')

    const userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String,
        mobile: Number
    })

    const MyModel = mongoose.model('xyz', userSchema);

    const data = new MyModel({ name: "Jeet", email: "jeet@gmail.com", password: "Jeet@123", mobile: 9123456789 })

    const results = await data.save();
    console.log(results);

}

main();


// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// async function getData() {
//     await client.connect();
//     const db = client.db("NodeAPI");
//     const collection = db.collection('User');
//     const data = await collection.find({}).toArray();
//     return data
// }

// async function insertData(data) {
//     await client.connect();
//     const db = client.db("NodeAPI");
//     const collection = db.collection('User');
//     const insertData = await collection.insertOne(data)
//     return insertData
// }

// async function updateData(id, data) {
//     await client.connect();
//     const db = client.db("NodeAPI");
//     const collection = db.collection('User');
//     const update = await collection.updateMany({ _id: new ObjectId(id) }, { $set: data });
//     // console.log(update);
//     return update
// }

// async function deleteData() {
//     await client.connect();
//     const db = client.db("NodeAPI");
//     const collection = db.collection('User');
//     const deleteData = await collection.deleteOne({ _id: new ObjectId('67a9de9d001253c0240cd954') });
//     console.log(deleteData);
//     // return deleteData
// }

// deleteData()


// app.get('/', (req, res) => {
//     res.send("This is my home Page")
// })

// app.get('/getData', async (req, res) => {
//     const data = await getData()
//     res.send(data)
// })

// app.post('/insertData', async (req, res) => {
//     const data = await insertData(req.body);
//     res.send(data)
// })

// app.put('/updateData/:id', async (req, res) => {
//     const data = await updateData(req.params.id, req.body)
//     res.send(data)
// })


// app.get('/add/:num1/:num2', (req, res) => {
//     const num1 = req.params.num1;
//     const num2 = req.params.num2;
//     const data = calcu.add(num1, num2)
//     res.send(data)
// })

// app.get('/sub', (req, res) => {
//     const num1 = req.query.num1;
//     const num2 = req.query.num2;
//     const data = calcu.sub(num1, num2)
//     res.send(data)
// })

app.listen(8080);

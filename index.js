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
const calcu = require('./calcu')
const app = express();

app.get('/', (req, res) => {
    res.send("This is my home Page")
})

app.get('/add', (req, res) => {

    const num1 = req.query.num1;
    const num2 = req.query.num2;

    const data = calcu.add(num1, num2)
    res.send(data)
})

app.get('/sub', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;
    const data = calcu.sub(num1, num2)
    res.send(data)
})

app.listen(8080);

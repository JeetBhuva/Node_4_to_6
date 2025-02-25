const express = require('express');

const app = express();

app.use(express.json())

const MyModel = require('./userSchema')

require('./db')

const main = async (req, res) => {

    const data = new MyModel({ name: "Jeet", email: "jeet@gmail.com", password: "Jeet@123", mobile: 9123456789 })

    const results = await data.save();
    console.log(results);

}


app.post("/insertData", async (req, res) => {
    const data = await main();

    res.send(data)
})

app.listen(8080);

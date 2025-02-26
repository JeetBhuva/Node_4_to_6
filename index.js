const express = require('express');

const app = express();

app.use(express.json())

const MyModel = require('./userSchema')

require('./db')

app.post("/insertData", async (req, res) => {

    const { name, email, password, mobile } = req.body

    const data = await MyModel.create({
        name: name,
        email: email,
        password: password,
        mobile: mobile
    })
    console.log(data);

    res.send(data)
})

app.post('/login', async (req, res) => {

    const { email, password } = req.body

    const userLogin = await MyModel.findOne({ email: email })

    console.log(userLogin);

    if (!userLogin) {
        res.send("Wrong User")
    }

    if (userLogin.password == password) {
        res.send("User Login...!")
    } else {
        res.send("Wrong Password...!")
    }

})

app.listen(8080);

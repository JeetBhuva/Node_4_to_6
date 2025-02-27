const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json())

const MyModel = require('./userSchema')

require('./db')

app.post("/insertData", async (req, res) => {

    const { name, email, password, mobile } = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    console.log(hashPassword);

    const data = await MyModel.create({
        name: name,
        email: email,
        password: hashPassword,
        mobile: mobile
    })
    console.log(data);

    res.send(data)
})

app.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        const userLogin = await MyModel.findOne({ email: email })

        const comperPassword = await bcrypt.compare(password, userLogin.password)

        if (!userLogin) {
            res.send("Wrong User")
        } else {
            if (comperPassword) {
                res.send("User Login...!")
            } else {
                res.send("Wrong Password...!")
            }
        }
    } catch (error) {
        res.send("Internal Server Error...!")
    }

})

app.listen(8080);

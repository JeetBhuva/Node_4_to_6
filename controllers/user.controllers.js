const MyModel = require('../Models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = "@J!E#E$T%123&"

const insertData = async (req, res) => {

    const { name, email, password, mobile } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    console.log(hashPassword);

    const data = await MyModel.create({
        name: name,
        email: email,
        password: hashPassword,
        mobile: mobile
    })
    console.log(data);

    res.send(data);
}

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const userLogin = await MyModel.findOne({ email: email });

        console.log(userLogin);


        const comperPassword = await bcrypt.compare(password, userLogin.password);

        if (!userLogin) {
            res.send("Wrong User")
        } else {
            if (comperPassword) {

                const token = await jwt.sign({ email: userLogin.email, password: userLogin.password }, privateKey, { expiresIn: '1h' })

                // console.log("--->", token);

                res.send("User Login...!");
            } else {
                res.send("Wrong Password...!");
            }
        }
    } catch (error) {
        res.send("Internal Server Error...!");
    }

}

module.exports = {
    insertData,
    login
}
const MyModel = require('../Models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = "@J!E#E$T%123&"
const nodemailer = require('nodemailer');

const insertData = async (req, res) => {

    try {
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
    } catch (error) {
        res.status(500).send("Internal Server Error...!");
    }

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

                res.status(201).send({ msg: "User Login...!", userLogin: userLogin, token: token });
            } else {
                res.send("Wrong Password...!");
            }
        }
    } catch (error) {
        res.status(500).send("Internal Server Error...!");
    }
}

const sendOTP = async (req, res) => {

    const _otp = Math.floor((Math.random() * 900000) + 100000);

    console.log(_otp);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "bhuvajeet99@gmail.com",
            pass: "inin dzok zygj czde",
        },
    });

    const info = await transporter.sendMail({
        from: 'bhuvajeet99@gmail.com', // sender address
        to: "raiyanimaitri@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>OTP : ${_otp}</b>`, // html body
    });

    console.log("Message sent: %s", info);
}


module.exports = {
    insertData,
    login,
    sendOTP
}
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

    const { email } = req.body

    const _otp = Math.floor((Math.random() * 900000) + 100000);

    const userLogin = await MyModel.findOne({ email: email });
    console.log(userLogin);


    const updateOTP = await MyModel.findByIdAndUpdate({ _id: userLogin._id }, { otp: _otp }, { new: true })

    if (userLogin) {
        res.send("OTP SEND")
    } else {
        res.send("WRONG EMAIL ID !")
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "bhuvajeet99@gmail.com",
            pass: "inin dzok zygj czde",
        },
    });

    const info = await transporter.sendMail({
        from: 'bhuvajeet99@gmail.com', // sender address
        to: email,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>OTP : ${_otp}</b>`, // html body
    });

    console.log("Message sent: %s", info, updateOTP);
}

const submitOTP = async (req, res) => {

    const { email, otp } = req.body

    const userLogin = await MyModel.findOne({ email: email });

    if (!userLogin) {
        res.send("WRONG USER...!")
    }

    if (userLogin.otp === otp) {
        res.send("OTP VERIFY...!");
    } else {
        res.send("WRONG OTP...!");
    }
}

const newPassword = async (req, res) => {
    
    const { email, newPassword } = req.body;

    const userLogin = await MyModel.findOne({ email: email });

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await MyModel.findByIdAndUpdate({ _id: userLogin._id }, { password: hashPassword }, { new: true })

    if (updatePassword) {
        res.send("PASSWORD UPDATE...!")
    } else {
        res.send("PASSWORD NOT UPDATE...!")
    }

}

module.exports = {
    insertData,
    login,
    sendOTP,
    submitOTP,
    newPassword
}
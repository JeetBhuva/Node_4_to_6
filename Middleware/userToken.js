const jwt = require('jsonwebtoken');
const privateKey = "@J!E#E$T%123&"

const userToken = async (req, res, next) => {

    const token = req.headers.authorization

    await jwt.verify(token, privateKey, (err) => {
        if (err) {
            res.send("User Unauthorization")
        } else {
            next();
        }
    })
}

module.exports = {
    userToken
}
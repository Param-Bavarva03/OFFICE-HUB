const jwt = require('jsonwebtoken');
const Register = require('../routes/register');

const auth = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Register.findOne({ _id: verifyUser._id });
        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        res.redirect("/")
        // res.status(401).send(`Please login to visit this page. \n Error: ${error}`);
    }
}

module.exports = auth;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const Schema = mongoose.Schema;

// Decalring the user schema
const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },

    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 20
    },

    confirmpassword: {
        type: String,
        // required: true,
        min: 8,
        max: 20
    },
    role: {
        type: String,
        min: 2,
        max: 20
    },
    stafflogin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


})


// generating functions
usersSchema.methods.generateAuthToken = async function() {
    try {
        // console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
        this.tokens = this.tokens.concat({ token: token })
            // console.log("The required token is " + token);
        await this.save();

        return token;
    } catch (error) {
        // res.send("The error part " + error);
        console.log("The error part " + error);
    }
}


// Hasing the password
usersSchema.pre("save", async function(next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = await bcrypt.hash(this.password, 10);
    }
    // const passwordHash = await bcrypt.hash(password, 10);
    next();
})

// Creating collections:
const User = new mongoose.model("User", usersSchema);
module.exports = User;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const Schema = mongoose.Schema;

// Decalring the user schema
const usersSchema = new Schema({
    number: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    codec: {
        type: String,
        required: true,
        unique: true,
        index: true,
        min: 2,
        max: 50
    },  
})

// Creating collections:
const code = new mongoose.model("code", usersSchema);
module.exports = code;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const Schema = mongoose.Schema;

// Decalring the user schema
const usersSchema = new Schema({
    feed_name: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },

    feed_des: {
        type: String,
        required: true,
        min: 1,
        max: 500
    } 
})

// Creating collections:
const feedback = new mongoose.model("feedback", usersSchema);
module.exports = feedback;
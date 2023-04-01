const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const Schema = mongoose.Schema;

// Decalring the user schema
const usersSchema = new Schema({
    pro_name: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    pro_progress: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    codec: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },  
})

// Creating collections:
const project = new mongoose.model("project", usersSchema);
module.exports = project;
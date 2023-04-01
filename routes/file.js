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

    fieldname: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },

    mimetype: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    destination: {
        type: String,
        default: true,
        min: 1,
        max: 200
    },  
    filename: {
        type: String,
        default: true,
        min: 1,
        max: 200
    },
    path: {
        type: String,
        default: true,
        min: 1,
        max: 200
    },
    size: {
        type: Number,
        default: true,
    },


})

// originalname: {
//     type: String,
//     required: true,
//     max: 50,
//     unique: true
// },

// encoding: {
    //     type: String,
    //     required: true,
    //     min: 1,
    //     max: 250
    // },

// Creating collections:
const UploadFile = new mongoose.model("UploadFile", usersSchema);
module.exports = UploadFile;
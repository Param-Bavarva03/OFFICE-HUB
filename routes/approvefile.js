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

    DocTitle: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },

    DocType: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    DocDate: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    Docpath: {
        type: String,
        default: true,
        min: 1,
        max: 200
    },
    DocStatus: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    Docsize: {
        type: Number,
        default: true,
    },

});

// Creating collections:
const approval = new mongoose.model("approval", usersSchema);
module.exports = approval;
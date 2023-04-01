const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const Schema = mongoose.Schema;

// Decalring the user schema
const usersSchema = new Schema({
    team_name: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },

    team_des: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    tcode: {
        type: String,
        required: true,
        min: 1,
        max: 50
    },
    user1: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    user2: {
        type: String,
        required: true,
        min: 1,
        max: 200
    },
    user3: {
        type: String,
        default: true,
        min: 1,
        max: 200
    },
    user4: {
        type: String,
        default: true,
        min: 1,
        max: 200
    }  
})

// Creating collections:
const team = new mongoose.model("team", usersSchema);
module.exports = team;
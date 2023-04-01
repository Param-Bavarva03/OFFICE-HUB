const serv = require('./connection').con;
const express= require('express');
const app = express();
const users = [];

// join user to chat
function userJoin(id, username, room) {
   const user = { id, username, room };

   users.push(user);

   return user;
}

// async function userJoin(id, username, room) {
//    // Check if user exists in Mongoose database
//    app.post('/Message',(req,res)=>{
//       const {username}: req.body;
//    });
//    const existingUser = await UserModel.findOne({ username: username });
//    if (existingUser) {
//       return existingUser;
//    }

//    // If user doesn't exist, create a new user object
//    const user = { id, username, room };

//    // Add the user to the users array
//    users.push(user);

//    // Save the new user to the Mongoose database
//    await UserModel.create(user);

//    return user;
// }


// get current user
function getCurrentUser(id) {
   return users.find((user) => user.id === id);
}

// user leaves chat
function userLeave(id) {
   const index = users.findIndex((user) => user.id === id);

   if (index !== -1) {
      return users.splice(index, 1)[0];
   }
}

// get room users
function getRoomUsers(room) {
   return users.filter((user) => user.room === room);
}

module.exports = {
   userJoin,
   getCurrentUser,
   userLeave,
   getRoomUsers,
};

const mongoose = require("mongoose")

const MONGO_URL = 'mongodb+srv://bavarvaparam2:param@cluster0.jgstbqm.mongodb.net/officehub';

mongoose.set("strictQuery", false);


const serv = mongoose.connect(MONGO_URL)
    .then(console.log(`DB Connection is success!`))
    .catch((error) => {
        console.log(`DB connection is Failed!`)
        console.log(error);
});

module.exports = serv;    
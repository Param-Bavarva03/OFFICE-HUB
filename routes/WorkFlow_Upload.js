const express = require('express');
const app = express();
const multer = require("multer");
const approval = require('./approvefile');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const serv = require('./connection').con;
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const dateOnly = `${year}-${month}-${day}`;
const auth = require('../controllers/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`);
    }
});

const upload = multer({ storage });

app.post('/DocFlow/Upload', auth,upload.single('DocFile'), (req, res) => {
    console.log(req.file);
    const file = new approval({
        username: req.user.username,
        DocTitle: req.file.filename,
        DocType: req.body.DocType,
        DocDate: dateOnly,
        Docpath: req.file.path,
        DocStatus: "pending",
        Docsize: req.file.size
    })
    const files = file.save();

    console.log('file upload...');
    return res.redirect("/DocFlow");
});

module.exports = app;
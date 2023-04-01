require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const cookie = require("cookie-parser");
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const responsedelay = 50;   // miliseconds
const auth = require("./controllers/auth");
const File = require("./routes/file");
const codec = require("./routes/code");
const https= require('http');

// DATABASE
const serv = require('./routes/connection').con;
const FileUpload = require("./routes/file");


// static folders
app.use(express.static('public'));
app.use(express.static('userfiles'));
app.use(express.static('uploads'));
// app.use(express.static('views'));
// app.use(express.static('CSS'));a
// app.use(express.static('Images'));
// app.use(express.static('img'));
// app.use(express.static('JavaScript'));
// app.use(express.static('public/js'));
app.set('views', path.join(__dirname, 'views'));
app.use(cookie());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use("/js", express.static(path.join(__dirname, "/public/js")));
app.use('/',require('./routes/pages'));
app.use('/',require('./routes/Workflow_Upload'));


//upload handler
var uploadStorage = multer.diskStorage(
{
    destination: function (req, file, cb)
    {
        cb(null, `./userfiles/${req.query.type}`);  ///${req.folder}`);
    },
    filename: function (req, file, cb)
    {
        //let fileName = checkFileExistense(req.query.folder ,file.originalname);
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: uploadStorage });
app.post('/', upload.single('file'), function(req, res)
{
    codec.findOne({number: 1}).then(function(a){
        console.log("Code:",a.codec);
        const file = new FileUpload({
            username: a.codec,
            fieldname: req.file.fieldname,
            mimetype: req.file.mimetype,
            destination:req.file.destination,
            filename:req.file.filename,
            path:req.file.path,
            size:req.file.size
        })
        const files = file.save();
    })
    // console.log("Hello",req.file);
    console.log('file upload...');
});

// all type of files except images will explored here
app.post('/files-list/:code', function(req, res)
{
    let folder = req.query.folder;
    let contents = '';

    let readingdirectory = `./userfiles/${folder}`;
    const code = req.params.code;
    File.find({username: code}).then(function(lists){
    fs.readdir(readingdirectory, function(err, files)
    {
        if(err) { console.log(err); }
        else if(files.length > 0)
        {
            files.forEach(function(value, index, array)
            {
                fs.stat(`${readingdirectory}/${value}`, function(err, stats)
                {
                    let filesize = ConvertSize(stats.size);
                    for(let i=0;i<lists.length;i++)
                    {
                    if(value==lists[i].filename)
                    {
                    contents += '<tr><td><a href="/' + folder + '/' + encodeURI(value) + '">' + value + '</a></td><td>' + filesize + '</td><td>/' + folder + '/' + value + '</td></tr>' + '\n';
                    break;
                    }
                }
                    if(index == (array.length - 1)) { setTimeout(function() {res.send(contents);}, responsedelay); }
                });
            });
        }
        else
        {
            setTimeout(function() {res.send(contents);}, responsedelay);
        }
    })
})
});

/*
this part is written because i wanted to show you how you can explore in differnt directories
for search a specific type of files (in this case images)
*/
app.post('/image-list', function(req, res)
{
    // this part is a little different because i wanted to find all images without looking at file extentions
    // and instead i will looking for image files due to the binary information of files and check several first bytes
    // those bytes are unique for each file type (or mime type)

    var contents = '';

    var directories = ['/font', '/html', '/image', '/pdf', '/video'];
    var dirindex = 0;
    
    /**
     * this is an inline function for iterating the directories array instead of loops. it cause avoiding conflitcness of loops and async jobs.
     * @param dindex index of directories
     */
    var readNextDirectory = function(dindex)
    {
        let directory = directories[dindex];

        fs.readdir(`./userfiles${directory}`, function(err, files)
        {
            if(err)
            {
                console.log(`Error: ${err}`);
            }
            else if(files.length > 0)
            {
                files.forEach(function(value, index, array)
                {
                    fs.readFile(`./userfiles${directory}/${value}`, function(err, data)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        // ffd8 and 89504e47 are magic number of image files (jpeg and png)
                        // this condition searches for "jpeg" and "png" images (you must add other magic numbers yourself)
                        else if(data.toString('hex').search('ffd8') == 0 || data.toString('hex').search('89504e47') == 0)    // findig jpeg and png images by watching files as binary data and checking the 2 or 4 magic bytes/numbers.
                        {
                            fs.stat(`./userfiles${directory}/${value}`, function(err, stats)
                            {
                                let filesize = ConvertSize(stats.size);
                                contents += '<div class="details"><div class="image"><img src="' + directory + '/' + encodeURI(value) + '" alt="' + value + '"></div><p><a href="' + directory + '/' + encodeURI(value) + '">' + value + '</a></p><p>' + filesize + '</p><p>' + directory + '/' + value + '</p></div>' + '\n';
                            });
                        }
                        
                        if(index == array.length - 1 && dirindex == directories.length - 1)
                        {
                            setTimeout(function() { res.send(contents); }, responsedelay);
                            return;
                        }
                        else if(index == array.length - 1 && dirindex < directories.length)
                        {
                            readNextDirectory(++dirindex);
                        }
                    });
                });
            }
            else if(dirindex == directories.length - 1)
            {
                setTimeout(function() { res.send(contents); }, responsedelay);
            }
            else if(files.length == 0)
            {
                readNextDirectory(++dirindex);
            }
        });
    };
    
    readNextDirectory(dirindex);
});

/**
 * it gives a number as byte and convert it to KB, MB and GB (depends on file size) and return the result as string.
 * @param number file size in Byte
 */
function ConvertSize(number)
{
    if(number <= 1024) { return (`${number} Byte`); }
    else if(number > 1024 && number <= 1048576) { return ((number / 1024).toPrecision(3) + ' KB'); }
    else if(number > 1048576 && number <= 1073741824) { return ((number / 1048576).toPrecision(3) + ' MB'); }
    else if(number > 1073741824 && number <= 1099511627776) { return ((number / 1073741824).toPrecision(3) + ' GB'); }
}


//chat

const socketIo = require('socket.io');
const formatMessage = require('./routes/messages');
const {
   userJoin,
   getCurrentUser,
   userLeave,
   getRoomUsers,
} = require('./routes/users');

const server = https.createServer(app);
const io = socketIo(server);

// set static file
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'OOFICEHUB Bot';

// run when client connects
io.on('connection', (socket) => {
   socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      // welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to OFFICEHUB!'));

      // broadcast when a user connects
      socket.broadcast
         .to(user.room)
         .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat!`)
         );

      // send users and room info
      io.to(user.room).emit('roomUsers', {
         room: user.room,
         users: getRoomUsers(user.room),
      });
   });

   // listen for chatMessage
   socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('message', formatMessage(user.username, msg));
   });

   // runs when clients disconnects
   socket.on('disconnect', () => {
      const user = userLeave(socket.id);

      if (user) {
         io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat!`)
         );

         // send users and room info
         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room),
         });
      }
   });
});

server.listen(port, () => {
    console.log(`🎯 Server is started on port: http://${hostname}:${port}/`);
});

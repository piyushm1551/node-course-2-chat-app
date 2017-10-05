const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer (app);
var io = socketIO(server);
  var d = new Date ();
app.use(express.static(publicPath));

io.on('connection',(socket) => {
console.log('New user connected');

// socket.emit('newEmail',{
//   from : 'mike@example.com',
//   text : 'Hey ,What is going on',
//   createAt : 123
// });
//
// socket.on('createEmail',(newEmail) => {
//   console.log('createEmail',newEmail);
// })

// socket.emit('newMessage',{
//   from : 'Piyush',
//   text : 'Hii, have a nice day',
//
//   createAt : `${d.getUTCHours()}` + `:${d.getUTCMinutes()}`
// });

socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));

socket.broadcast.emit('newMessage',generateMessage('Admin','New User joined'));

socket.on('createMessage',(message,callback) => {
  console.log('createMessage',message);
  io.emit('newMessage',generateMessage(message.from,message.text));
  callback('This is from the server.');
  // socket.broadcast.emit('newMessage',{
  //   from : message.from,
  //   text : message.text,
  //   createdAt : new Date().getTime()
  // });
});

socket.on('createLocationMessage',(coords) => {
  io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
});

socket.on('disconnect',(socket) => {
  console.log('User disconnected');
});

});


server.listen(port,() => {
  console.log(`server is running on port ${port}`);
})

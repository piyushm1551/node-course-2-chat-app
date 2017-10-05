const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

socket.emit('newMessage',{
  from : 'Admin',
  text : 'Welcome to the Chat App'
});

socket.broadcast.emit('newMessage',{
  from : 'Admin',
  text : 'New User joined',
  createdAt : new Date().getTime()

})

socket.on('createMessage',(message) => {
  console.log('createMessage',message);
  io.emit('newMessage',{
    from : message.from,
    text : message.text,
    createdAt : new Date().getTime()
  });
  // socket.broadcast.emit('newMessage',{
  //   from : message.from,
  //   text : message.text,
  //   createdAt : new Date().getTime()
  // });
});

socket.on('disconnect',(socket) => {
  console.log('User disconnected');
});

});


server.listen(port,() => {
  console.log(`server is running on port ${port}`);
})

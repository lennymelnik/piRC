var piblaster = require('pi-blaster.js');
var cors = require('cors');



const express = require('express');const app = express();
app.use(cors())
const http = require('http');const server = http.createServer(app);const { Server } = require("socket.io");const io = new Server(server);
app.get('/', (req, res) => {  res.sendFile(__dirname + '/index.html');});
io.on('connection', (socket) => {  console.log('a user connected');


    socket.on('modify', (value) => {    piblaster.setPwm(18, value ); 
        console.log("Modify")
    })

});



server.listen(3001, () => {  console.log('listening on *:3000');});
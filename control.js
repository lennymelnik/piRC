var piblaster = require('pi-blaster.js');
var cors = require('cors');



const express = require('express');const app = express();
app.use(cors())
const http = require('http');const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors: {    origin: "https://blug.io" }
});
app.get('/', (req, res) => {  res.sendFile(__dirname + '/index.html');});
io.on('connection', (socket) => {  console.log('a user connected');


    socket.on('modify', (value) => {
        if(value > .05 && value < .16){
            piblaster.setPwm(18, value ); 
        console.log("Modify", value)
        }    
    })

});



server.listen(3001, () => {  console.log('listening on *:3000');});
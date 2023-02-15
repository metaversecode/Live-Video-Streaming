const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));
const admin = require("firebase-admin");
const socketIO = require('socket.io');
const serviceAccount = require(path.join(__dirname,"config","live-video-stream-official-firebase-adminsdk-olqj3-79909c7076.json"));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://live-video-stream-official-default-rtdb.firebaseio.com/"
  });
const db = admin.database();
const server = app.listen(3000, function(){
    console.log("App started at 3000 (live video streaming)")
})
const io = socketIO(server);
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, 'public', 'live.html'));
})
const connectedClients = {};
io.on('connection' , socket => {
    connectedClients[socket.id] = socket;
    console.log("A user Connected " + " , " + socket.id);
    socket.on("send", data=>{
        io.emit("send0" , {
            data2 : data.data1
        })
    })
    socket.on('disconnect', () => {
        delete connectedClients[socket.id];
        socket.disconnect()
        console.log('A user disconnected');
      });
})
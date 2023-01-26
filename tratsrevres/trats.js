const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const enc = require("../srepleh/noitpyrcne")
const db = require("../ledom/db");
const config = require("../sliatededon/gifnoc");
const fs = require("fs")
 var socketio = require('socket.io');
//  var cron = require('node-cron');
 const queryhelper = require('../srepleh/yreuq');
 const unitySchema = require('../ledom/ytinu');

const common = require("../srepleh/nommoc")
const encrypter = require("../srepleh/noitpyrcne")

let port = config.port;

const indexRouter = require("../setuor/index");

const adminBasicRouter = require('../setuor/cisabnimda');
const adminSettingsRouter = require('../setuor/sgnittesnimda');
const settingsRouter = require('../setuor/sgnittes');
const tokenRouter = require('../setuor/nekot');
const activityRouter = require("../setuor/ytivitca")
const whiteListRouter = require("../setuor/whitelist");
const unity = require("../srepleh/tekcos")
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
     res.header("Access-Control-Allow-Headers", "Content-Type");

     return next();
});

app.use("/", indexRouter);
app.get("/test", (req, res) => {
     res.send(`<center><h4> Admin Panel1 </h4> </center>`);
});


app.get('/logs', (req, res) => {
     console.log("logcomming")
     let file = path.join(__dirname, '../logs/combined.outerr.log');
     fs.readFile(file, 'utf-8', (err, data) => {
          console.log(err, "err")
          res.json(data);
     })
})

app.get('/emptyLogs', (req, res) => {
     let file = path.join(__dirname, '../logs/combined.outerr.log');
     fs.writeFile(file, "", (err, data) => {
          res.json("Logs truncated");
     })
})

app.use('/admin/basic', adminBasicRouter);
app.use('/admin/settings', adminSettingsRouter);
app.use('/admin/site', settingsRouter);
app.use('/admin/token', tokenRouter);
app.use('/user/activity', activityRouter)
app.use('/admin/whitelist', whiteListRouter)


app.use(function (req, res, next) {
     next(createError(404));
});



app.use(function (err, req, res, next) {
     res.locals.message = err.message;
     res.locals.error = req.app.get("env") === "development" ? err : {};
     res.status(err.status || 500);
     res.render("error");
});

app.use(function (req, res, next) {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
     res.setHeader('Access-Control-Allow-Credentials', true);
     next();
});




let server;
if (config.serverType == "http") {
     const http = require("http");
     server = http.createServer(app);

     server.listen(port, () => console.log(`Local Back End server is running on http://localhost:${port}`));

} else {
     const https = require("https");
     server = https.createServer(config.serverOptions, app);
     server.listen(port, () => console.log(` Back End server is running on https://api.collarquest.com`));
}

var io = socketio(server, {
     cors: {
          origin: '*',
     },
     serveClient: false,
     pingTimeout: 6000000,
     pingInterval: 30000,
     cookie: false
});

socket_file = require('../srepleh/tekcos');
socket_file.initiate(io);


// to all connected clients in the "news" room
//io.to("news").emit("hello");

io.on('connection', (socket) => {
     //console.log("new client connected", socket.id);

socket.emit("event", "message");

socket.on("roomConnect",(data)=>{
     unity.roomConnection (io,data,async (roomData)=>{         
          await socket.join(roomData.roomNumber)
	     socket.to(roomData.roomNumber).emit(roomData.playList+"Joined");
          socket.emit("shareRoomId",roomData);

     })
})

socket.on("roomList",(roomNumber)=>{
     unity.rommList(io,roomNumber)

})

socket.on("leaveRoom", (roomNumber) => {

     io.leave(roomNumber)
})

socket.on("roomChat",async ( chatRoomId ) => {
     console.log("chatRoomId",chatRoomId)

     io.to(chatRoomId.roomNumber).emit("roomChatMessage", chatRoomId)
})

socket.on("playerData",(playerData)=>{
     unity.playerData (io,playerData,async (roomData)=>{
          console.log(roomData)
     })

})
     return io;
})


// cron.schedule('*/1  * * * *', () => {
//      unitySchema.find({status:"Active"},(response)=>{
//           console.log(response,"respppp")
//           for(var i=0; i<response.length;i++){
//                if(response[i].createdAt > new Date().getTime()){
//                     unitySchema.updateOne({ status:"Active" },{"$set":{}},(res)=>{                    
//                     })
//                }
//           }
//      })
// })
module.exports = app;

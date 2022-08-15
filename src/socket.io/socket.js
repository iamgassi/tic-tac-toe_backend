const app=require('express')();
const server=require('http').createServer(app)
const io =require("socket.io")(server)
const router=require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(router)

io.on("connection",(socket)=>{
     console.log(socket)
     console.log("hello from socket")
})

server.listen(9000,()=>{
    console.log("socket is on",9000)
})
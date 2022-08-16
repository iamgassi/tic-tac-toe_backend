const app=require('express')();
const server=require('http').createServer(app)
const io =require("socket.io")(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }})
const router=require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(router)

io.on("connect",(socket)=>{
      socket.on('join',({name,room},callback)=>{
        const {error,user} =addUser({id:socket.id,name,room});
        if(error) return callback(error)

        socket.join(user.room);
        socket.emit('message',{user:'admin',text:`${user.name}, welcome to room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
 
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();  

      })

      socket.on('disconnect',()=>{
        const user=removeUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} Has left the room`})
            io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        }
      })
})

server.listen(9000,()=>{
    console.log("socket is on",9000)
})
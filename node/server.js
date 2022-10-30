const {instrument} = require('@socket.io/admin-ui')
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

const app = express();
app.use(cors())


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000" , "https://admin.socket.io"],
    credentials: true,
    methods: ["GET", "POST"]
  }
});

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.render("test")
})

io.on("connection", async (socket) => {
  console.log(socket.id)

  socket.join("default");

  socket.on("user_join" , (data) => {
    if(data.room == "") {
      data.room = "default"
    }
    console.log(data)
    io.sockets.emit("join_display" , data )
  })

  socket.on("join_room", (data) => {
    const arr = Array.from(io.sockets.adapter.rooms);
    const arr_2 = Array.from(socket.rooms);
    const filtered = arr.filter(room => !room[1].has(room[0]))
    // for (let int = 0; int < filtered.length; int++) {
    //   if (filtered[int][0] == data.room) {
    //     let room_message = "désoler le nom du chanel que vous voulez est déja utilisé par un autre utilisateur"
    //     socket.emit('message_room', { message: room_message, room: data.room })
    //     return
    //   }
    // }

    socket.emit('message_room', { message: 'ok', room: data.room  ,inviter: data.inviter })
    // socket.leave(arr_2[1])
    socket.join(data.room);
     io.sockets.emit("join_display" , data )
  })

  const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);

  socket.on("remove_room", (data) => {
    const arr = Array.from(io.sockets.adapter.rooms);
    const filtered = arr.filter(room => !room[1].has(room[0]))
    for (let int = 0; int < filtered.length; int++) {
      if (filtered[int][0] == data) {
        // socket.leave(data)
        // console.log(filtered[int][1])
      }
    }
  })

  socket.on('send_message', (data) => {
    if (data.room == "") {
      data.room = "default";
    }
    data.user_id = socket.id
    console.log(data.user + " à écrit dans " + data.room + " : " + data.message)
    io.sockets.to(data.room).emit('receive_message', data)
  })

});


instrument(io , {auth: false})

httpServer.listen(3001, function () {
  console.log("ok")
});



const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
const uuid = require('uuid');

const count = io.engine.clientsCount;

// const PORT = process.env.PORT || 4242
app.set("view engine" , "ejs")

io.engine.generateId = (req) => {
    return uuid.v4(); // must be unique across all Socket.IO servers
}

app.get("/" , (req , res) => {
    res.render("index")
})

server.listen(4242, () => {
    console.log(`Server is up on port ${count} !`)
})

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id); // ojIckSD2jqNzOqIrAGzL
    
    socket.on('message', (data) => {
        socket.broadcast.emit('message' , data)
    })
});
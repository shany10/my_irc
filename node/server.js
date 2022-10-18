const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })
const uuid = require('uuid');
const bodyParser = require('body-parser');
app.use(express.urlencoded());

const count = io.engine.clientsCount;

// app.set("view engine" , "ejs")
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
var options = { beautify: true };
app.engine('jsx', require('express-react-views').createEngine(options));







io.engine.generateId = (req) => {
    return uuid.v4(); // must be unique across all Socket.IO servers
}

server.listen(4242, () => {
    console.log(`Server is up on port ${count} !`)
})

io.on("connection", (socket) => {
    console.log("User connected: " + socket.id); // ojIckSD2jqNzOqIrAGzL

    socket.on('message', (data) => {
        socket.broadcast.emit('message' , data)
    })
});
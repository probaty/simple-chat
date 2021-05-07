const express = require('express')
const { Server} = require('socket.io')
const http = require('http')


const app = express()
const server = http.createServer(app)
const io = new Server(server)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message',  msg)
    })
    socket.on('user connected', (msg) => {
        socket.broadcast.emit('user connected', msg)
    })
})

server.listen(3000, () => {
    console.log(`server started`);
})
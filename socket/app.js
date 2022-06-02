const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors: {
        origin: '*',
    }
});
const cors = require('cors')

app.get('/', (req, res) => {
    console.log('hi')
});
app.use(cors())

io.on('connection', (socket) => {
    socket.on('on strapi', (msg) => {
        io.emit('on admin', msg);
    });
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3010, () => {
    console.log('listening on *:3010');
});
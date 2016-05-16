'use strict';

const PORT = 8000;

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');
var rps = require('./rps');

var app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

var server = http.createServer(app);

// create socket.io server
var io = require('socket.io')(server);


io.on('connection', function(socket) {
    rps.iniGame(io, socket);
})



server.listen(PORT, err => {
    console.log(err || `Server listenting on port ${PORT}`);
});

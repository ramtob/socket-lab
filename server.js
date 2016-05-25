var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.get('/', function (req, res) {
	//res.sendFile(__dirname + '/index.html');
//});

io.on('connection', function (socket) {
	var msg = "Server: socket " + socket.id + " connected";
	console.log(msg);
	io.emit('chat message', msg);
	socket.on('chat message', function (msg) {
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function () {
		msg = "Server: socket " + socket.id + " disconnected";
		console.log(msg);
	});
});

var nsp = io.of('/nsp');
nsp.on('connection', function(socket){
  var msg = "Server: nsp socket " + socket.id + " connected";
	console.log(msg);
	socket.on('disconnect', function () {
		msg = "Server: nsp socket " + socket.id + " disconnected";
		console.log(msg);
	});
});

http.listen(3001, function () {
	console.log('listening on *:3001');
});

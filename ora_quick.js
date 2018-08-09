/// mAfrica OraQuick Server
//  Author: Steven Gray
//  Email:  steven.gray@ucl.ac.uk
//  Date:  08/08/18
//  Version: 1.0.2

var serverPort = 8888;

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  
function handler (req, res) {
  	fs.readFile(__dirname + '/index.html',
  	function (err, data) {
	    if (err) {
	      res.writeHead(500);
	      return res.end('Error loading index.html');
	    }

	    res.writeHead(200);
	    res.end(data);
  	});
}

console.log("mAfrica OraQuick Server is now listening for connections on port "+ serverPort +".");  
app.listen(serverPort);

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log("Server Address: " + add + "\tPort: " + serverPort);
})

io.sockets.on('connection', function (socket) {
  
  console.log("Client Connected");

  socket.on('positive', function (data) {
    console.log("Positive Recieved");
    io.sockets.emit('pos');
  });

  socket.on('negative', function (data) {
    console.log("Negative Recieved");
    io.sockets.emit('neg');
  });

  socket.on('invalid', function(data){
    console.log("Unknown Recieved");
    io.sockets.emit('inval');
  });

  socket.on('retake_photo', function (data) {
    console.log("Retake Photo Recieved");
    io.sockets.emit('retake');
  });

  socket.on('tabletPing', function(data) {
	   io.sockets.emit('tabletPong', JSON.stringify({"status": "pong"}) );
  });

  socket.on('tabletReadyProcessing', function(data) {
     io.sockets.emit('tabletIsReadyForProcessing', JSON.stringify({"status": "ready"}) );
  });

  socket.on('getServerAddress', function(data){
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
      console.log("Server Address: " + add + "\tPort: " + serverPort);
      socket.emit("serverAddress", "Server Address: <b>" + add + "</b>\tPort: <b>" + serverPort + "</b>");
    })
  });

});

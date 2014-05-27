/// <reference path="../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js" />
/// <reference path="../typings/d3/d3.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />


var socket = io.connect('http://tumadademo61.azurewebsites.net/');
socket.on('connect');


$('#messageBox').change(function(){
	socket.emit('vote', JSON.stringify({
		message: $('#messageBox').val()
	}))
	$('#messageBox').val('');
});


socket.on('refresh', function(data) {
	var jData = JSON.parse(data);
	$('#chat').prepend(jData.message + '<br />');
});

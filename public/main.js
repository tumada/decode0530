/// <reference path="../node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js" />
/// <reference path="../typings/d3/d3.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />


var socket = io.connect('http://tumadademo61.azurewebsites.net/');
socket.on('connect');

d3.selectAll('.vote').on('click', function() {
	socket.emit('vote', JSON.stringify({
		id: d3.select(this).attr('id').toString()
	}))
});

$('#messageBox').change(function() {
	socket.emit('send chat', JSON.stringify({
		message: $('#messageBox').val()
	}))
	$('#messageBox').val('');
});

socket.on('refresh', function(data) {
	var jData = JSON.parse(data);
	var d = refreshData(jData.options);
	change(d);
});

socket.on('rec chat', function (data){
	var jData = JSON.parse(data);
	$('#chat').prepend(jData.message + '<br />');
});

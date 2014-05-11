var ws = require('websocket-stream');

var socket = ws('ws://localhost:8000');

socket.end('hello\n');
var through = require('through');
var http = require('http');

var server = http.createServer(function onRequest(req, res) {
	if (req.method === 'POST') {
		req.pipe(through(function write(chunk) {
			this.queue(chunk.toString().toUpperCase());
		})).pipe(res);	
	} else {
		res.end('Send me a POST request\n');
	}
	
});
server.listen(parseInt(process.argv[2], 10));
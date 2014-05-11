var crypto = require('crypto');
var zlib = require('zlib');

var tar = require('tar');
var through = require('through');

var decipher = crypto.createDecipher(process.argv[2], process.argv[3]);
var gunzip = zlib.createGunzip();
var parser = tar.Parse();

parser.on('entry', function onEntry(entry) {
  if (entry.type == 'File') {
    entry
        .pipe(crypto.createHash('md5', { encoding: 'hex' }))
        .pipe(through(null, function end() {
          this.queue(' ' + entry.path + '\n');
        }))
        .pipe(process.stdout);
  }
});

process.stdin
    .pipe(decipher)
    .pipe(gunzip)
    .pipe(parser);
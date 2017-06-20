"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Contenty-Type': 'text/plain' });
    response.end('Hello world! \n');
});
var port = 8000;
server.listen(port);
console.log('Listening on http://localhost:' + port);

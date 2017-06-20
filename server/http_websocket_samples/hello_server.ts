import * as http from 'http';

const server = http.createServer((request, response) => {
    response.writeHead(200, {'Contenty-Type': 'text/plain'});
    response.end('Hello world! \n');
});

const port = 8000;

server.listen(port);

console.log('Listening on http://localhost:' + port)

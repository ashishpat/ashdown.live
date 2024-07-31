//app.js

const http = require('http')
const fs = require('fs');
const path = require('path');
const port = 8080

// Create a server object:
const server = http.createServer(function (req, res) {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
          }
          res.end();
        });
    }
});


// Set up our server so it will listen on the port
server.listen(port, function (error) {

    // Checking any error occur while listening on port
    if (error) {
        console.log('Something went wrong', error);
    }
    // Else sent message of listening
    else {
        console.log('Server is listening on port' + port);
    }
})
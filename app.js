var url = require('url');
var fs = require('fs');
var wifi = require("node-wifi");

function renderHTML(path, response) {
    fs.readFile(path, null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
          //  response.write(data);
        }
        response.end();
    });
}

module.exports = {
  handleRequest: function(request, response) {
    //  response.writeHead(200, {'Content-Type': 'text/html'});
   //   response.writeHead(200, {'Content-Type': 'video/mp4'});

      var path = url.parse(request.url).pathname;
      switch (path) {
          case '/':
            console.log("case 1");
            //  renderHTML('./index.html', response);
              renderHTML('./video.mp4', response);
              break;
          case '/login':
              renderHTML('./login.html', response);
              wifi.init({
                iface: null // network interface, choose a random wifi interface if set to null
              });
              wifi.connect({ ssid: "WiFi Ingenieria", password: "" }, function(err) {
                if (err) {
                  console.log(err);
                }
                else{
                console.log("Connected");
                }
              });
              break;
          default:
              response.writeHead(404);
              response.write('Route not defined');
              response.end();
      }

  }
};
var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


exports.handleRequest = function (request, response) {
  if(request.method === 'GET'){

    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        if(error){
          throw error;
        }
        headers["Content-Type"] = "text/html";
        response.writeHead(200, headers);
        // response.write(html);
        response.end(html);
      });
    }
    
  }

//   fs.readFile('./index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8000);
// });





  if(request.method === 'POST'){
    
  }

  // resource.end(archive.paths.list);
};

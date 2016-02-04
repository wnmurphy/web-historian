var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var http = require('http');
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
        response.writeHead(200, headers);
        response.end(html);
      });
    }
    else{
      response.end();
    }
    
  }






  if(request.method === 'POST'){
  }

  // resource.end(archive.paths.list);
};

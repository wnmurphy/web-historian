var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var url = require('url');
var http = require('http');


var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var list = archive.paths.list //(sites.txt)
var archivedSites = archive.paths.archivedSites //(archived sites folder)
var assets = archive.paths.siteAssets //(loading.html, index.html)

exports.handleRequest = function (request, response) {

  if(request.method === 'GET'){
    // Redirect root request to index.html
    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        response.writeHead(200, headers);
        response.end(html);
      });
    }else{
      var site = url.parse(request.url).pathname.split('/')[1];
      fs.readFile(archive.paths.archivedSites + '/' + site, function(error, data){
      console.log(archive.paths.archivedSites + site);
      response.writeHead(200, headers);
      console.log(data);
      response.end(data);
    });
      //response.end(request.url);
    }

  // If user submits a website
  }else if(request.method === 'POST'){
    var pathName = url.parse(request.url).pathname.split('/')[1];

    request.on('data', function(data){

    });

    console.log(pathName);
    fs.readFile(archive.paths.archivedSites + pathName, function(error, data){
      console.log(archive.paths.archivedSites + pathName);
      response.writeHead(200, headers);
      response.end(data);
    });


    // If requested URL is in our archive
        // if archive.isUrlArchived(pathName[1])
          // Serve archived version
        // otherwise
          // Add URL to sites.txt (Worker will archive it after 1min)
          // archive.addUrlToList(pathName, list)
          // Serve loading.html
    }
  
};
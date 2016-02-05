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

// console.log('readlistofurls:' + archive.readListOfUrls(archive.paths.list));


exports.handleRequest = function (request, response) {
  // When user directly accesses URLs
  if(request.method === 'GET'){
    // Redirect root request to index.html
    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        response.writeHead(200, headers);
        response.end(html);
      });
    // Otherwise, return archived site.
    }else{
      var site = url.parse(request.url).pathname.split('/')[1];
      fs.readFile(archive.paths.archivedSites + '/' + site, function(error, data){
        if(error) {
          response.writeHead(404, headers);
          response.end();
        }
        else {
          response.writeHead(200, headers);
          response.end(data);
        }
      });
    }

  // If user submits a website
  }
  else if(request.method === 'POST'){
    console.log('test url: ' + request.url);

    archive.getUrlFromFormData(request, response, function(url) {
      var fixturePath = archive.paths.archivedSites + "/" + url;
      var urlName = fixturePath.split(".")[1];
      
      // Add site file to archive/sites/.
      fs.writeFile(fixturePath, urlName);

      // Add site name to sites.txt.
      fs.appendFile(archive.paths.list, (url+'\n'), function(err, data) {
        if(err) {
          return err;
        }
        else {
          console.log('Wrote to sites.txt');
          response.writeHead(302, headers);
          response.end();
        }
      })
      

    });

    // request.on('data', function(data){

    // });

    
    // fs.readFile(archive.paths.archivedSites + pathName, function(error, data){
    //   console.log(archive.paths.archivedSites + pathName);
    //   response.writeHead(200, headers);
    //   response.end(data);
    // });


    // If requested URL is in our archive
        // if archive.isUrlArchived(pathName[1])
          // Serve archived version
        // otherwise
          // Add URL to sites.txt (Worker will archive it after 1min)
          // archive.addUrlToList(pathName, list)
          // Serve loading.html
    }
  
};
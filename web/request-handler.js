var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var http = require('http');
var qs = require('querystring');
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
 var pathName = url.parse(request.url).pathname.split('/');
 console.log("request.url is: " + request.url);
  if(request.method === 'GET'){

    // If user requests root
    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        response.writeHead(200, headers);
        response.end(html);
      });
    // If user requests a different path
    }else if(pathName[1]){
        response.writeHead(200, headers);
        response.end(pathName[1])
    }else{
      // 404 not found
      response.end();
    }

  // If user submits a website
  } else if(request.method === 'POST'){
    var data = "";
    request.on('data', function(chunk){
      data += chunk;
      var url = data.split('url=')[1];
      console.log(url);
      response.end();
    })
   
    
      // If requested URL is in our archive
      // list = archive.readListOfUrls()
      // if archive.isUrlInList(pathName[1], list)
        // if archive.isUrlArchived(pathName[1])
 //     if(){
        // Serve archived version
 //     }else{
        // Add URL to sites.txt (Worker will archive it after 1min)
        // archive.addUrlToList(pathName, list)
        // Serve loading.html
 //     }
  }
  
};

// form-encoded data from POST
// url=www.google.com

/*
To Do:
  Web
    Write 404 handler
    
    Check URL format of actual user search input
    
    Extract form data
    
    Convert form data to JSON
    
    Extract target URL to variable 
    
    Check sites.txt:
      archive.readListOfUrls() > list
    
    archive.isUrlInList(url, list)
      If present, archive.isUrlArchived(url)
        If true, serve archived HTML page
      If not present,
        Add url to sites.txt.
        Serve loading.html

  Workers
    Archive a web page (save local copy) with archive.downloadUrls()

*/
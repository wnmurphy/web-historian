var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var fs = require('fs');
var url = require('url');
var http = require('http');
var validUrl = require('valid-url');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var list = archive.paths.list //(sites.txt)
var archivedSites = archive.paths.archivedSites //(archived sites folder)
var assets = archive.paths.siteAssets //(loading.html, index.html)
var listFile = fs.readFileSync(list, 'utf8');

exports.handleRequest = function (request, response) {
 var pathName = url.parse(request.url).pathname.split('/');
 console.log("request.url is: " + request.url);
  if(request.method === 'GET'){

    // Redirect root to index.html
    if(request.url === '/'){
      fs.readFile('public/index.html', function(error, html){
        response.writeHead(200, headers);
        response.end(html);
      });
    // If user requests a different path
    }else if(pathName[1]){
        response.writeHead(200, headers);
        response.end(pathName[1])
    }

  // If user submits a website
  }else if(request.method === 'POST'){
    // Get and store the form-encoded url
    var requestedUrl = getUrlFromFormData(request, response);


    // If requested URL is in our archive
        // if archive.isUrlArchived(pathName[1])
          // Serve archived version
        // otherwise
          // Add URL to sites.txt (Worker will archive it after 1min)
          // archive.addUrlToList(pathName, list)
          // Serve loading.html

    addUrlToList(requestedUrl);
    console.log(listFile);
  }else{
    request.end();
  };
  
};

// Extract and return requested URL from HTML form data.
var getUrlFromFormData = function(request, response){
  var url = '';
  request.on('data', function(chunk){
    url += chunk;
    url = url.split('url=')[1];
    console.log('url in getUrlFromFormData: ' + url);
    return url;
  });
};

// Check whether requested URL is valid.
var isValidUrl = function(url){
  if (!(validUrl.isUri(url))){
    return false;
  }else{
    return true
  }
};

// Convert sites.txt to array.
var readListOfUrls = function(listFile){
  //split sites.txt to an array
  var sitesArray = listFile.split('\n');
  return sitesArray;
};

// Check whether URL is already in sites.txt array.
var isUrlInList = function(url, list){
  if(list.indexOf(url) !== -1){
    return true;
  }else{
    return false;
  }
};

// Queue up target URL in sites.txt to be archived.
var addUrlToList = function(url){
    if( !(isUrlInList(url, list)) ){
      fs.appendFile(list, url+'\n');
    }
};

// Check if target URL is present in archive folder.
var isUrlArchived = function(url){
  // use fs to check if folder for URL exists in archives/sites/
  // return true if found
    // else return false
}; 



/*
To Do:
  Web
    Write 404 handler
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
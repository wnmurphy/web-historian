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
    archive.getUrlFromFormData(request, response, function(url) {
      // console.log('cb url: ' + url);
      // console.log(archive.paths.list);
      var fixturePath = archive.paths.archivedSites + "/" + url;
      var urlName = fixturePath.split(".")[1];
      
      //****this adds text file to archives/sites folder****
      // var fd = fs.openSync(fixturePath, "w");
      // fs.writeSync(fd, urlName);
      // fs.closeSync(fd);
      // fs.writeFileSync(fixturePath, urlName);

      fs.appendFile(archive.paths.list, ('\n'+url), function(err, data) {
        if(err) {
          return err;
        }
        else {
          console.log('success');
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
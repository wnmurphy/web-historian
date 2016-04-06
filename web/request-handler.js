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

exports.handleRequest = function (request, response) {
  // When user directly accesses URLs
  if (request.method === 'GET') {
    // Redirect root request to index.html
    if (request.url === '/') {
      fs.readFile('public/index.html', function (error, html) {
        response.writeHead(200, headers);
        response.end(html);
      });
    // Otherwise, return archived site.
    } else {
      var site = url.parse(request.url).pathname.split('/')[1];
      fs.readFile(archive.paths.archivedSites + '/' + site, function (error, data) {
        if (error) {
          response.writeHead(404, headers);
          response.end();
        } else {
          response.writeHead(200, headers);
          response.end(data);
        }
      });
    }
  }
};

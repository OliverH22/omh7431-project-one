const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getVideos': jsonHandler.getVideos,
    '/updateVideos': jsonHandler.updateVideos,
    notFound: jsonHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

// Don't know about this one
function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById('demo').innerHTML = this.responseText;
    }
  };
  xhttp.open('GET', 'ajax.txt', true);
  xhttp.send();
}

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

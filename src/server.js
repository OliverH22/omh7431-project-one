const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/getUserClosets': jsonHandler.getUserClosets,
    '/addUserItem': jsonHandler.addUserItem,
    '/notReal': jsonHandler.notReal,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    // these should all be meta ones! bc no message :)
    '/getUserClosetsMeta': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notRealMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};// Change types

const handlePost = (request, response) => {
  const res = response;
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    res.statusCode = 400;
    res.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    jsonHandler.addUserItem(request, res, bodyParams);
  });
};


const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  //console.log(params);

  if (request.method === 'POST' && parsedUrl.pathname === '/addUserItem') {
    handlePost(request, response, parsedUrl);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

////////////////////////////////////////////////////////
const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;    
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};

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

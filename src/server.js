const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    // case '/party.mp4':
    //   mediaHandler.getParty(request, response);
    //   break;
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

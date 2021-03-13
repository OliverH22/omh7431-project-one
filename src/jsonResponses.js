const fs = require('fs');
const path = require('path');

const accounts = {};

// gets and plays video
// Code is from Streaming Assignment
// const getVideo = (request, response) => {
//   const file = path.resolve(__dirname, '../client/.mp4');

//   fs.stat(file, (err, stats) => {
//     if (err) {
//       if (err.code === 'ENOENT') {
//         response.writeHead(404);
//       }
//       return response.end(err);
//     }

//     let { range } = request.headers;

//     if (!range) {
//       range = 'bytes=0-';
//     }

//     const positions = range.replace(/bytes=/, '').split('-');

//     let start = parseInt(positions[0], 10);

//     const total = stats.size;
//     const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

//     if (start > end) {
//       start = end - 1;
//     }

//     const chunksize = (end - start) + 1;

//     response.writeHead(206, {
//       'Content-Range': `bytes ${start}-${end}/${total}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'video/mp4',
//     });

//     const stream = fs.createReadStream(file, { start, end });

//     stream.on('open', () => {
//       stream.pipe(response);
//     });

//     stream.on('error', (streamErr) => {
//       response.end(streamErr);
//     });

//     return stream;
//   });
// };

// function to respond with a json object and takes everything to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body and takes everything in it
const respondJSON2 = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return user as JSON
const getUser = (request, response) => {
  const responseJSON = {
    accounts,
  };

  respondJSON(request, response, 200, responseJSON);
};

// function to add a user from POST
const addUser = (request, response, body) => {
  // default message
  const responseJSON = {
    message: 'Username and password are both required.',
  };

  // check to make sure we have everything
  // If either anything is missing, send back an error message
  if (!body.username || !body.video) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default code
  const responseCode = 201;

  // update fields for this user name
  accounts[body.username].username = body.username;
  accounts[body.username].password = body.password;
  accounts[body.username].video = body.video;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSON2(request, response, responseCode);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFound2 = (request, response) => respondJSON2(request, response, 404);

// exporting
module.exports = {
  getUser,
  addUser,
  respondJSON,
  respondJSON2,
  notFound,
  notFound2,
};

const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const respondJSON = (request, response, status, object) => {
  const responseJSON = JSON.stringify(object);
  return respond(request, response, status, responseJSON, 'application/json');
};

const respondXML = (request, response, status, object) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${object.message}</message>`;
  if (object.id)responseXML = `${responseXML} <id>${object.id}</id>`;
  responseXML = `${responseXML}</response>`;
  return respond(request, response, status, responseXML, 'text/xml');
};

const success = (request, response, type) => {
  const responseJSON = {
    message: 'This is a successful response.',
  };

  if (type === 'text/xml') respondXML(request, response, 200, responseJSON);
  else respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set equal to true';
    responseJSON.id = 'badRequest';
    if (type === 'text/xml') respondXML(request, response, 400, responseJSON);
    else respondJSON(request, response, 400, responseJSON);
  } else if (type === 'text/xml') respondXML(request, response, 200, responseJSON);
  else respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, type, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };
  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseJSON.message = 'Missing loggedIn query parameter set equal to yes';
    responseJSON.id = 'unauthorized';
    if (type === 'text/xml') respondXML(request, response, 401, responseJSON);
    else respondJSON(request, response, 401, responseJSON);
  } else if (type === 'text/xml') respondXML(request, response, 200, responseJSON);
  else respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, type) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (type === 'text/xml') respondXML(request, response, 403, responseJSON);
  else respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, type) => {
  const responseJSON = {
    message: 'Internal Server Error: Something went wrong.',
    id: 'internal',
  };

  if (type === 'text/xml') respondXML(request, response, 500, responseJSON);
  else respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (type === 'text/xml') respondXML(request, response, 501, responseJSON);
  else respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (type === 'text/xml') respondXML(request, response, 404, responseJSON);
  else respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

'use strict';

// [START functions_http_template]
exports.http_template = (request, response) => {
  // HTTP-triggered functions receive a "request" object that contains info about the HTTP request.
  // HTTP requests 99% of the time expect a response, otherwise the request will eventually "timeout".

  // This cloud function looks for JSON or text in the request, and returns a response.
  // If the request body is not JSON or text, it returns a "400 Bad Request" error.

  try {
    if (request.is('application/json')) {
        request_json = request.get_json(silent=True)
        console.log(json.dumps(request_json, indent=2))
    } else if (request.is('text/plain')) {
        console.log(request.data)
    } else {throw new Error(":(")}
    response.status(200).send(`I received your ${request.get('Content-Type')
  } request`) 
  } catch (e) {
      response.status(400).send('Bad Request - you didnt POST me any JSON or text') 
  };
};
// [END functions_http_template]

// [START functions_pubsub_template]
exports.pubsub_template = (message, context) => {
  // pubsub-triggered functions receive a "context" object that contains info about the pubsub event that triggered them (which may or may not be useful to you).
  // they don't have to return anything as they are not a "request" for something like a HTTP request.
  console.log(`This Function was triggered by messageId ${context.event_id} published at ${context.timestamp} to ${context.resource["name"]}`)
};
// [END functions_pubsub_template]

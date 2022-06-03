# healthchecks
A Node.js app to test startup and liveness health checks

## How to use

### Testing http probes

Use URL parameters to customize the response to requests sent on any path of this server.

* delaySeconds: The number of seconds to wait before returning, defaults to 0.
* status: The HTTP status code to return, default to 200.
* failures: The number of failures (500 responses) to return before returning the status above, default to 0.


* `/healthcheck?delaySeconds=10&status=500`: will return a 500 status code with a delay of 10 seconds
* `/?failures=5`: will return a 5 500 responses followed by 1 200 response

### Testing TCP probes

Use environment variables to customize the time before the server listens on the port.

* `SERVER_DELAY_SECONDS` (defaults to 0): The number of seconds to wait before listening on the port.
* `SERVER_PORT` (defaults to `PORT`, or to 8080 if not present): The port to listen on.

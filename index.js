import * as http from 'node:http';

const port = process.env.SERVER_PORT || process.env.PORT || 8080;
const serverDelay = parseInt(process.env.SERVER_DELAY_SECONDS) || 0;
let failureCounter = 0;

console.info(`server will listen on port ${port} after ${serverDelay} seconds.`)

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://example.com`);
  const delaySeconds = parseInt(url.searchParams.get('delaySeconds')) || 0;
  const status = parseInt(url.searchParams.get('status')) || 200;
  const failures = parseInt(url.searchParams.get('failures')) || 0;

  // ignore favicon requests
  if (req.pathname === '/favicon.ico') {
    res.statusCode = 404;
    res.end();
    return;
  }

  console.log(`Will return ${status} in ${delaySeconds} seconds after ${failures} failures (currently at ${failureCounter}/${failures} failures).`);

  if (failureCounter < failures-1) {
    failureCounter++;
    res.statusCode = 500;
    res.end();
    return;
  }
  failureCounter = 0;

  setTimeout(() => {
    res.statusCode = status;
    res.end();
  }, delaySeconds * 1000);

});

setTimeout(() => {
  server.listen(port, () => console.info(`server is listening on port ${port} after ${serverDelay} seconds.`));
}, serverDelay * 1000);
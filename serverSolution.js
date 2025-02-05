const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const http = require('http');

  const server = http.createServer((req, res) => {
    // Simulate a long-running operation
    const start = Date.now();
    while (Date.now() - start < 5000) {
      // Wait
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!');
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} listening on port 3000`);
  });
}

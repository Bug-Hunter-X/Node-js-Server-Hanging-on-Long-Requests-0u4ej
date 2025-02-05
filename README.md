# Node.js Server Hanging on Long Requests

This repository demonstrates a common issue in Node.js servers where a long-running request can cause the server to hang and become unresponsive to other requests.  The issue is due to Node.js's single-threaded event loop.  When a request takes a long time to process, it blocks the event loop, preventing other requests from being handled. 

## Bug Description

The `server.js` file contains a simple HTTP server that simulates a long-running operation.  A request to this server will cause the server to hang for 5 seconds before responding. During this 5-second period, the server will not respond to any other requests. This is a significant issue for applications requiring high concurrency.

## Solution

The `serverSolution.js` demonstrates how to resolve this issue using Node.js's worker threads and clustering. Worker threads help to prevent the event loop from being blocked by allowing the long operation to run concurrently without blocking the main thread.
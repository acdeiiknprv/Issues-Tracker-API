Sitemate Backend Challenge

The challenge is to create a simple REST API Server + Client for Issues

The REST API server can be anything that can return static JSON - local on your machine or in the cloud. For example: local Node.js, Python or any server running on your machine, a serverless function in the cloud, a container, whatever you’re most comfortable with.

The server should support these 4 standard operations: 
Create: accepts a JSON object & prints/logs the object
Read: returns a static JSON object
Update: accepts a JSON object & prints/logs the object
Delete: prints/logs out the object or id to delete

The REST API Client should be a command line interface (CLI) that connects to each of the server endpoints and prints out the response. Ideally, this is a Node.js client, but could be anything that connects to your server. 

The client should support the same 4 standard operations:
Create: sends a JSON object to the server
Read: requests a JSON object & prints it out
Update: sends a JSON object to the server
Delete: requests the server delete an issue


Usage:

node ./server.js to start server
node ./client.js to start client

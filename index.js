const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// create the server
const app = express();

//server config TODO: Use ENV Variables
const PORT = 3000;
const HOST = "localhost";
const URL_PATH = "/departures";

// Proxy config
// TODO add functionality to take parameters from URL
const ENDPOINT_URL = "https://v6.bvg.transport.rest/stops/900075154/departures?duration=35";
const proxySettings = {
	target: ENDPOINT_URL,
	changeOrigin: true, // what does this do?
}

const proxy = createProxyMiddleware(proxySettings);

app.use(URL_PATH, proxy);

// now start the server
app.listen(PORT, HOST, () => {
	console.log(
		`Starting proxy at ${HOST}:${PORT} \nGo to ${HOST}:${PORT}${URL_PATH}`
	);
});
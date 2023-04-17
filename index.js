const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

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
	changeOrigin: true, // The origin(URL) is changing (to localhost)
	selfHandleResponse: true, // res.end() will be called internally by responseInterceptor()
	onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
		// convert response to a variable so we can manipulate it
		let data = JSON.parse(responseBuffer.toString('utf8'));
		let newData = {};
		let currTime = new Date();
		// sort departures based on their destination
		data.departures.sort((a, b) => a.destination.name.localeCompare(b.destination.name));

		for (const bus of data.departures) {
			let arrTime = new Date(bus.when) // gotta convert to object
			let countdown = (arrTime - currTime) / 60000;
			const regex = /( [\(\[].+[\)\]])+/; // everything between & including brackets
			let trimmedDestination = bus.destination.name.replace(regex, ''); // remove that stuff
			console.log(`${bus.line.id} going to ${trimmedDestination} in ${Math.floor(countdown)}min, occupancy is: ${bus.occupancy}`);
		}
		return JSON.stringify(data); // convert back to JSON notation
	}),
}

const proxy = createProxyMiddleware(proxySettings);

app.use(URL_PATH, proxy);

// minimal error handling
app.use((req, res, next) => {
	res.status(404).json({
		message: 'Incorrect endpoint URL'
	})
})

// now start the server
app.listen(PORT, HOST, () => {
	console.log(
		`Starting proxy at ${HOST}:${PORT} \nGo to ${HOST}:${PORT}${URL_PATH}`
	);
});
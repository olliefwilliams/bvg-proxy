# BVG Proxy

A simple express app to proxy requests made to the BVG API.

The idea is to abstract away the API from whatever will be consuming it. Eventually this will include a responsive mobile site and a ESP/Arduino controlled, battery-powered display. Lower powered microcontrollers can't deal with TLS/HTTPS and are generally a little more difficult to write code for, so this proxy removes that burden of securty from the microcontroller, and will extend the existing API to enable a `simple` mode where the payload is greatly reduced in size and complexity.

As it stands, the API requires no authentication, but this could change, so again, using middleware means that adding this feature would only need to be done in one place.

## Installation

It's the usual: run `npm i` to install dependencies.

## Deployment

Use `node index.js` to start the proxy server.

This hasn't been tested in the wild yet, but a simple VPS with Node.js is all that's needed. There are a bunch of providers who make this especially easy to set up, e.g. [Heroku](heroku.com/), [Railway](https://railway.app/), [Vercel](https://vercel.com/) etc.
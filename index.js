const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

//api keys for accessing services
const weather_api = process.env.API_KEY_WEATHER;
const yelp_api = process.env.API_KEY_YELP;
const geo_api = process.env.API_KEY_GEO;
const giphy_api = process.env.API_KEY_GIF;

//console.log(process.env)

app.listen(PORT);
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

const getLocation = (request, response, next) => {
  const latlon = request.params.latlon.split(',');
  const [ lat, lon ] = latlon;
  request.lat = lat;
  request.lon = lon;
  next();
}

app.get('/geolocation/:latlon', getLocation, async (request, response) => {
  const geo_url = `https://api.opencagedata.com/geocode/v1/json?q=${request.lat}+${request.lon}&key=${geo_api}`;
  const resp = await fetch(geo_url);
  const data = await resp.json();
  response.send(data);
})

app.get('/weather/:latlon', getLocation, async (request, response) => {
  const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${request.lat}&lon=${request.lon}&appid=${weather_api}&units=metric`;
  const resp = await fetch(weather_url);
  const data = await resp.json();
  response.send(data);
})

app.get('/air/:latlon', getLocation, async (request, response) => {
  const airQuality_url = `https://api.openaq.org/v1/latest?coordinates=${request.lat},${request.lon}`;
  const resp = await fetch(airQuality_url);
  const data = await resp.json();
  response.send(data);
})

app.get('/gif', async (request, response) => {
  const giphy_url = `http://api.giphy.com/v1/gifs/random?api_key=${giphy_api}`
  const resp = await fetch(giphy_url);
  const data = await resp.json();
  response.send(data);
})

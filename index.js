const express = require('express');
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const weather_api = process.env.API_KEY_WEATHER;
const yelp_api = process.env.API_KEY_YELP;
const geo_api = process.env.API_KEY_GEO;

//console.log(process.env)

app.listen(PORT);
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

app.get('/geolocation/:latlon', async (request, response) => {
  const latlon = request.params.latlon.split(',');
  const [ lat, lon ] = latlon;
  const geo_url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geo_api}`;
  const resp = await fetch(geo_url);
  const data = await resp.json();
  response.send(data);
  console.log(data);
})

app.get('/weather/:city', async (request, response) => {

})

export async function getWeather(position) {
  const resp = await fetch(`/weather/${position.lat},${position.lon}`);
  const data = await resp.json();
  return data;
}

//weather quality api doesn't require api key so the request can be made from client's side
export async function getAirQuality(position) {
  const resp = await fetch(`/air/${position.lat},${position.lon}`);
  const data = await resp.json();
  return data.results[0] ? data.results[0].measurements : 'no results'
}

export default async function getWeather(position) {
  const resp = await fetch(`/weather/${position.lat},${position.lon}`);
  const data = await resp.json();
  return data;
}

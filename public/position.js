//getting user's geolocation
export default function getPosition() {
  const userPosition = {};
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async (position) => {
      userPosition.lat = position.coords.latitude;
      userPosition.lon = position.coords.longitude;

      const resp = await fetch(`/geolocation/${userPosition.lat},${userPosition.lon}/`);
      const geoData = await resp.json();

      const result = geoData.results[0].components;
      if (result) {
        userPosition.country = result.country;
        userPosition.state = result.state;
        userPosition.city_or_district = result.city || result.state_district;
        userPosition.currency = geoData.results[0].annotations.currency.name;
      }
      //console.log(geoData);
    })
    return userPosition;
  } else {
    return 'geolocation unavailable';
  }
}

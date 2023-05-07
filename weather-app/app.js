import axios from 'axios';

let latitude;
let longitude;

axios.get('http://api.weatherstack.com/current?access_key=f72acb9cb0f9cd7da23f7e37e5fbe9b2&query=37.8267,-122.4233&units=m')
  .then(function (response) {
    // handle success
    console.log(`It is currently ${response.data.current.temperature} degrees out. It feels like ${response.data.current.feelslike} degress out.`);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
    console.log('terminé la temperatura!');
  });

  axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoiam9zZTF1c2VjaGUiLCJhIjoiY2xoOTVtOWhoMDQ1azNob2FzdXk5MXp4dSJ9.uJWmjljssJceIJ5owOKbYA&limit=1')
  .then(response => {
    // handle success
    /*The coordinates of the feature’s center in the form [longitude,latitude]. This may be the literal centroid of the feature’s geometry, or the center of 
    human activity within the feature (for example, the downtown area of a city).*/
    latitude = response.data.features[0].center[1];
    longitude = response.data.features[0].center[0];
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  })
  .catch(error => {
    // handle error
    console.log(error);
  })
  .finally(() => {
    // always executed
    console.log('terminé las coordenadas!');
  });
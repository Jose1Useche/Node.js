import axios from 'axios';

export let latitude;
export let longitude;
let site = 'Santa Teresa Del Tuy';

export const myForecast = site => axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(site)}.json?access_token=pk.eyJ1Ijoiam9zZTF1c2VjaGUiLCJhIjoiY2xoOTVtOWhoMDQ1azNob2FzdXk5MXp4dSJ9.uJWmjljssJceIJ5owOKbYA&limit=1`)
.then(response => {
    // handle success
    /*The coordinates of the feature’s center in the form [longitude,latitude]. This may be the literal centroid of the feature’s geometry, or the center of 
    human activity within the feature (for example, the downtown area of a city).*/
    [longitude, latitude] = response.data.features[0].center;
    //  = response.data.features[0].center[0];
    // return { latitude, longitude};

    return axios.get(`http://api.weatherstack.com/current?access_key=f72acb9cb0f9cd7da23f7e37e5fbe9b2&query=${latitude},${longitude}&units=m`)
})
.catch(error => {
    // handle error
    console.log('Error en mi primer then: ' + error);
    throw new Error(error);
})
.then(response => {
    // handle success
    // console.log(response.data.location.name);
    // console.log(`It is currently ${response.data.current.temperature} degrees out. It feels like ${response.data.current.feelslike} degress out.`);
    return { latitude, longitude, locationName: response.data.location.name, forecast: response.data.current.weather_descriptions[0] };
})
// .catch(error => {
//     // handle error
//     console.log('Error en mi segundo then: ' + error);
// });
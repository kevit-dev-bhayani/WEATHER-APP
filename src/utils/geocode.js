const request = require("request");
const axios = require('axios');

async function geocode(address) {
  const url = `https://geocode.maps.co/search?q={${address}}`;

  var data;
  try {
    data = await axios(url);

    if(data.data.length>0){
      return  {
              latitude: data.data[0].lat,
              longitude: data.data[0].lon,
              location: data.data[0].display_name,
            }
    }
    else{
      return ({'error':"No location found"});
    }
  } catch (error) {
    return ({'error':"Unable to use geocoding services"});
  }
}

module.exports = geocode;

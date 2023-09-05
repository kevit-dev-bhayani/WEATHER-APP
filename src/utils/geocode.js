const request = require("request");
const axios = require('axios');

async function geocode(address, callback) {
  const url = `https://geocode.maps.co/search?q={${address}}`;

  var data;
  try {
    data = await axios(url);
    // console.log(data);
    if(data.data.length>0){
      callback(undefined, {
              latitude: data.data[0].lat,
              longitude: data.data[0].lon,
              location: data.data[0].display_name,
            });
    }
    else{
      callback("No location found", undefined);
    }
  } catch (error) {
    callback("Unable to use geocoding services", undefined);
  }
}

module.exports = geocode;

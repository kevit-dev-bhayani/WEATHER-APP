const request = require("request");


function geocode(address, callback) {
  const url = `https://geocode.maps.co/search?q={${address}}`;
  request({  url, json: true }, (err, {body}={}) => {
    if (err) {
      callback("Unable to use geocoding services", undefined);
    } else if (body.length === 0) {
      callback("No location found", undefined);
    } else {
      callback(undefined, {
        latitude: body[0].lat,
        longitude: body[0].lon,
        location: body[0].display_name,
      });
    }
  });
}

module.exports=geocode
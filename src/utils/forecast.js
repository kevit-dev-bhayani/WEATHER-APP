// const request = require("request");
const axios = require("axios");

async function forecast(latitude, longitude,location) {
  const url = `http://api.weatherstack.com/current?access_key=8afd10a7cf67423b9435b93496011bdb&query=${latitude},${longitude}&units=m`;

  var data;
  try {
    data = await axios(url);
    
      return {'data':`${data.data.current.weather_descriptions} , there is ${data.data.current.temperature} degrees out, It feels like ${data.data.current.feelslike} degrees out`,
    location:location}
  
  } catch (error) {
    if (data === undefined) {
      return {'error':"Unable to connect weather services"}
    }
  }
}

module.exports = forecast;

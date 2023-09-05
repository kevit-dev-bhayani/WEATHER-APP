
const axios = require("axios");

async function forecast(latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=8afd10a7cf67423b9435b93496011bdb&query=${latitude},${longitude}&units=m`;

  var data;
  try {
    data = await axios(url);
    // data.json()
    // console.log(data.data.current)
    callback(
      undefined,
      `${data.data.current.weather_descriptions} , there is ${data.data.current.temperature} degrees out, It feels like ${data.data.current.feelslike} degrees out`
    );
  } catch (error) {
    if (data === undefined) {
      callback("Unable to connect weather services", undefined);
    }
  }
}

module.exports = forecast;

const request = require("request");

function forecast(latitude, longitude, callback) {
  const url =
    `http://api.weatherstack.com/current?access_key=8afd10a7cf67423b9435b93496011bdb&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (err, {body}) => {
    // const data=JSON.parse(res.body)
    if (err) {
      callback("Unable to connect weather services",undefined)
    } else if (body.error) {
      callback("unable to find location",undefined)
    } else {
      // console.log(body.current)
      callback(undefined,`${body.current.weather_descriptions} , there is ${body.current.temperature} degrees out, It feels like ${body.current.feelslike} degrees out`)
    }
  });
}

module.exports=forecast
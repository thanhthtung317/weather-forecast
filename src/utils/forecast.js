const request = require("request");

const forecast = (longitude, latitude, callback) => {
  url = `http://api.weatherstack.com/current?access_key=3944263900ca1c951652c4fdc176750d&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("cannot connect to the server", undefined);
    } else if (response.body.error) {
      callback("cannot find location", undefined);
    } else {
      const forecastString =
        "Observation time " + response.body.current.observation_time +
        ": It is currently " +
        response.body.current.temperature +
        " degree out. There is a " +
        response.body.current.precip +
        "% chance of rain";
      callback(undefined, forecastString);
    }
  });
};

module.exports = forecast
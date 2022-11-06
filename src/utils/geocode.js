const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?limit=1&access_token=pk.eyJ1IjoidGhhbmh0aGFuaHR1bmciLCJhIjoiY2xhMm5pN2FxMGo1djNubXF1bWpwd2xrMSJ9.k_5F89NmhiUvvliFTLBDHw";
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to the server", undefined);
    } else if (response.body.features.length === 0) {
      callback("cannot find location, please try again", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[1],
        latitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

const axios = require("axios");
const turf = require("@turf/turf");
const GeoJSON = require("geojson");
const barFinder = require("./yelpBarFinder");

module.exports = {
  findAddress2: (req, features, res) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          req.body.address2
        }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
      )
      .then(response => {
        var centerCoords = findCenterCoordinates(response, features);
        barFinder.yelpBarFinder(centerCoords, res);
      })
      .catch(error =>
        console.error(
          `Problem either getting coordinates address2 or turf: ${error.stack}`
        )
      );
  }
};

let findCenterCoordinates = (response, features) => {
  let coordinatesAddress2 = response.data.features[0].geometry.coordinates;
  let obj2 = {};
  obj2.lat = coordinatesAddress2[1];
  obj2.lng = coordinatesAddress2[0];
  features.push(obj2);
  var featureCollection = GeoJSON.parse(features, {
    Point: ["lat", "lng"]
  });
  var centerCoords = turf.center(featureCollection);
  return centerCoords;
};

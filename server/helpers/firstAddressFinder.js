const axios = require("axios");
const secondAddressFinder = require("./secondAddressFinder");

module.exports = {
  findAddress1: (req, features, res) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          req.body.address1
        }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
      )
      .then(response => {
        let coordinatesAddress1 =
          response.data.features[0].geometry.coordinates;
        let obj1 = {};
        obj1.lat = coordinatesAddress1[1];
        obj1.lng = coordinatesAddress1[0];
        features.push(obj1);
        secondAddressFinder.findAddress2(req, features, res);
      })
      .catch(error =>
        console.error(`Could not get location from MapBox: ${error.stack}`)
      );
  }
};

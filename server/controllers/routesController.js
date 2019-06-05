const axios = require("axios");

module.exports = {
  geocodeAddressOne: (req, res) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          req.body.address1
        }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
      )
      .then(response =>
        console.log(response.data.features[0].geometry.coordinates)
      )
      //these cordinates you get back are longitutde an latitude, but they could be in another order on another api! be mindful!
      .catch(error =>
        console.error(
          `Could not get location from MapBox for address1: ${error.stack}`
        )
      );
  },

  geocodeAddressTwo: (req, res) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          req.body.address2
        }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
      )
      .then(response =>
        console.log(response.data.features[0].geometry.coordinates)
      )
      //these cordinates you get back are longitutde an latitude, but they could be in another order on another api! be mindful!
      .catch(error =>
        console.error(
          `Could not get location from MapBox for address2: ${error.stack}`
        )
      );
  }
};

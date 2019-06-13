const axios = require("axios");
const turf = require("@turf/turf");
const GeoJSON = require("geojson");
const yelp = require("yelp-fusion");
const client = yelp.client(
  "h9PwSdv_BZvvWSTFhTpDWMQO1vl96LxSgmnkwLmmdLQ4nwi_-wyoJky5u4QUUjld3v2L95iCCys8PYRpaUtKoEJwWq94KuMZQS1fs5BeK8lJYVqQuLxz_vhANdH4XHYx"
);

module.exports = {
  axiosPost: (req, res) => {
    console.log(req.body.address1, req.body.address2);
    const features = [];
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

        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${
              req.body.address2
            }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
          )
          .then(response => {
            let coordinatesAddress2 =
              response.data.features[0].geometry.coordinates;
            let obj2 = {};
            obj2.lat = coordinatesAddress2[1];
            obj2.lng = coordinatesAddress2[0];
            features.push(obj2);
            var featureCollection = GeoJSON.parse(features, {
              Point: ["lat", "lng"]
            });
            var centerCoords = turf.center(featureCollection);
            // console.log(centerCoords);

            client
              .search({
                latitude: centerCoords.geometry.coordinates[1],
                longitude: centerCoords.geometry.coordinates[0],
                categories: "bars",
                sort_by: "rating",
                radius: 450,
                open_now: true,
                limit: 8
              })
              .then(response => {
                let randomNumba = Math.floor(Math.random() * 8);

                const bar = {
                  barName: response.jsonBody.businesses[randomNumba].name,
                  barImage: response.jsonBody.businesses[randomNumba].image_url,
                  barUrl: response.jsonBody.businesses[randomNumba].url,
                  barPrice: response.jsonBody.businesses[randomNumba].price,
                  barAddress:
                    response.jsonBody.businesses[randomNumba].location
                      .display_address
                };
                res.render("results", { ejsBar: bar });

                console.log(bar);
              })
              .catch(error => {
                console.error(`Error with using yelp-fusion: ${error.stack}`);
              });
          })
          .catch(error =>
            console.error(
              `Problem either getting coordinates address2 or turf: ${
                error.stack
              }`
            )
          );
      })

      .catch(error =>
        console.error(`Could not get location from MapBox: ${error.stack}`)
      );
  }
};

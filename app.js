const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 3000;
const turf = require("@turf/turf");
const GeoJSON = require("geojson");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: false
  })
);

app.post("/postaddresses", (req, res) => {
  console.log(req.body.address1, req.body.address2);
  const features = [];
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        req.body.address1
      }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
    )
    .then(response => {
      let coordinatesAddress1 = response.data.features[0].geometry.coordinates;
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
          // console.log(featureCollection.features);
          var centerCoords = turf.center(featureCollection);
          console.log(centerCoords);
          //
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
});

app.listen(port, () => console.log(`I hear ya port: ${port}`));

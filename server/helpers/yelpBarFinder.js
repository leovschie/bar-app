const yelp = require("yelp-fusion");
const client = yelp.client(
  "h9PwSdv_BZvvWSTFhTpDWMQO1vl96LxSgmnkwLmmdLQ4nwi_-wyoJky5u4QUUjld3v2L95iCCys8PYRpaUtKoEJwWq94KuMZQS1fs5BeK8lJYVqQuLxz_vhANdH4XHYx"
);

module.exports = {
  yelpBarFinder: (centerCoords, res) => {
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
            response.jsonBody.businesses[randomNumba].location.display_address
        };
        res.render("results", { ejsBar: bar });
        console.log(bar);
      })
      .catch(error => {
        console.error(`Error with using yelp-fusion: ${error.stack}`);
      });
  }
};

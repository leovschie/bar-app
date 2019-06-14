const helperFunctions = require("../helpers/firstAddressFinder");

module.exports = {
  axiosPost: (req, res) => {
    console.log(req.body.address1, req.body.address2);
    const features = [];
    helperFunctions.findAddress1(req, features, res);
  }
};

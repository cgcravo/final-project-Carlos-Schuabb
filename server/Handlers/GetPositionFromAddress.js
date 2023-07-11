const opencage = require('opencage-api-client');
require('dotenv').config();

const getPositionFromAddress = (address) => {
  const requestObj = {
    key: '7b316a66cee544c1904512256914e8be',
    q: address,
  };

  return opencage
  .geocode(requestObj)
  .then((data) => {
    return data.results[0].geometry
  })
  .catch((error) => {
    console.log('error', error.message);
  });

};

module.exports = { getPositionFromAddress };

 // const getPosition = async (address) => {
  //   const position = getPositionFromAddress(address)
  // };
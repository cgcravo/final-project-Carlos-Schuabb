const opencage = require('opencage-api-client');
require('dotenv').config();

const getAddressFromPosition = (lat, lng) => {
  const requestObj = {
    key: '7b316a66cee544c1904512256914e8be',
    q: `${lat}+${lng}`,
  };

  return opencage
  .geocode(requestObj)
  .then((data) => {
    return JSON.stringify(data.results[0].formatted)
  })
  .catch((error) => {
    console.log('error', error.message);
  });
}

module.exports = { getAddressFromPosition };

  // const getAddress = async (userLat, userLng) => {
  //   const address = await getAddressFromPosition(userLat, userLng)
  // };

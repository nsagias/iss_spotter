// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP('142.126.224.216',(error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned Coordinates: ', coordinates);
});


fetchISSFlyOverTimes('{ latitude: 43.783, longitude: -79.4122 }' ,(error, response) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned Coordinates: ', response);
});

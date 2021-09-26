const request = require('request-promise-native');


const fetchMyIP = () => {
  const req = 'https://api.ipify.org?format=json';
  return request(req);
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

// const fetchISSFlyOverTimes  = (body) => {
//   const { latitude, longitude } = JSON.parse(body);
//   return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
// }
const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
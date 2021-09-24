/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 * 'https://api.ipify.org?format=json' {"ip":"162.245.144.188"}
 */

const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  const req = 'https://api.ipify.org?format=json';
  request(req, (error, response, body) => {
    if (error) {
      // return console.log(error);
      return callback(error, null);
    }
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const getIP = JSON.parse(body).ip;
    // check if value if response goes gthrough
    if (getIP === undefined) {
      // return console.log('No IP in response')
      return callback('No IP in response');
    }
    // return console.log(null, getIP)
    return callback(null, getIP);
  });
};

/**
 * Define the fetchCoordsByIP
 * It should take in two arguments: ip (string) and callback
 * Add the function to the object properties being exported from iss.js
 * For now, it can have an empty body and do nothing
 *
 * "latitude":44,"longitude":-79,
 */

const fetchCoordsByIP = (ip, callback) => {
  const req = 'https://freegeoip.app/json/';
  // const req =  'https://freegeoip.app/json/invalideip'
  request(req, (error, response, body) => {
    if (error) {
      // return console.log(error, null);
      return callback(error, null);
    }
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
      // return console.log(Error(msg), null);
    }
    
    // let result = {};
    // const latitude =  JSON.parse(body).latitude;
    // const longitude = JSON.parse(body).longitude;

    const { latitude, longitude } = JSON.parse(body);

    
    // check if value if response goes gthrough
    // const longitude = undefined
    if (!latitude || !longitude) {
      return console.log('either no latitute or longitude', null);
    }
    // result["latitude"] = latitude;
    // result["longitude"] = longitude;
    // return console.log(null, result);
    // return callback(null, result);
    return callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 * https://iss-pass.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE.
 *
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  // const coords = { latitude: 43.783, longitude: -79.4122 }
  const { latitude, longitude } = coords;
  
  if (!latitude || !longitude) {
    // return console.log('either no latitute or longitude', null);
    return callback('either no latitute or longitude', null);
  }
  const req = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(req, (error, resp, body) => {
    if (error) {
      console.log(error, null);
    }
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
      // return console.log(Error(msg), null);
    }
    // returns an array
    const { response } = JSON.parse(body);
    // return console.log(null, response);
    return callback(null, response);
  });
  
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};

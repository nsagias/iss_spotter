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
    

    if (response.statusCode == 404) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
      // return console.log(Error(msg), null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
      // return console.log(Error(msg), null);
    }
    
    let result = {};
    const latitude =  JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    // check if value if response goes gthrough
    // const longitude = undefined
    if (!latitude || !longitude) {
      // return console.log('either no latitute or longitude', null);
      return callback('either no latitute or longitude', null);
    }

    result["latitude"] = latitude;
    result["longitude"] = longitude;
    // return console.log(null, result);
    return callback(null, result);
  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};



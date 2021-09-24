// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP('142.126.224.216',() => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } 
  console.log('It worked! Returned Coordinates:')
});

// Done: Require it in index.js
// Done: For now, call the function and pass in our (IPv4) IP address string as the first argument to the function
// For now, our callback can simply print out the values for error and data
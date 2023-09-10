const axios = require("axios");

async function getAddressBalance(address) {
  try {
    // Send a request to retrieve the balance for the given address
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
    
    // Log the response data to the console
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}
//mxVFsFW5N4mu1HPkxPttorvocvzeZ7KZyk use this super rich
module.exports = getAddressBalance;

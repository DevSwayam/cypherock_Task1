const axios = require("axios");

// Testnet Method Given
async function generateUsableAddressOnTestNet() {
  try {
    const response = await axios.post('https://api.blockcypher.com/v1/btc/test3/addrs');
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}

module.exports = generateUsableAddressOnTestNet;

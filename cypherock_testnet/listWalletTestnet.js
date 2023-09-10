const axios = require('axios');
const API = "594ceefc0f5c48029f792fee540e567b";

async function getWalletViaToken() {
  try {
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/wallets/hd/swayam?token=${API}`);
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}

module.exports = getWalletViaToken;

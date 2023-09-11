const axios = require('axios');
const API = process.env.BLOCKCYPHER_API_KEY;

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

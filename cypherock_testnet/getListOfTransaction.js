const axios = require('axios');

async function getTransactionsList(address) {
  try {
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`);
    const { txs } = response.data;

    if (txs && txs.length > 0) {
      console.log('Transactions:');
      txs.forEach((transaction, index) => {
        console.log(`Transaction #${index + 1}:`);
        console.log(`Hash: ${transaction.hash}`);
        console.log(`Total: ${transaction.total}`);
        console.log(`Fees: ${transaction.fees}`);
        console.log(`Size: ${transaction.size}`);
        console.log(`Received: ${transaction.received}`);
        console.log(`Confirmations: ${transaction.confirmations}`);
        console.log('\n');
      });
    } else {
      console.log('No transactions found.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error; // Re-throw the error for further handling, if needed
  }
}
//mxVFsFW5N4mu1HPkxPttorvocvzeZ7KZyk use this super rich
module.exports = getTransactionsList;

const bip39 = require('bip39');

function createMnemonicFromBIP(walletName, password) {
  try {
    if (
      typeof walletName === "string" &&
      (walletName !== null) & (typeof password === "string") &&
      password !== null
    ) {
      const mnemonic = bip39.generateMnemonic();
      
      // Create a wallet object with a unique identifier (e.g., walletName)
      const wallet = {
        name: walletName,
        mnemonic: mnemonic,
      };

      return wallet;
    } else {
      throw new Error("Provide Wallet Name in string format, please");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}

module.exports = createMnemonicFromBIP;

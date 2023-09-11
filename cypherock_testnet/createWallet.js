const axios = require("axios");
const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
require('dotenv').config();
const API = process.env.BLOCKCYPHER_API_KEY;
const fs = require("fs");
const path = require("path");
const createMnemonicFromBIP = require('./createWalletFromBIP.js')

async function createWallet(name, password) {
  try {
    // Create a wallet using BIP39
    const wallet = createMnemonicFromBIP(name, password);
    
    // Define the network (e.g., testnet)
    const network = bitcoin.networks.testnet;
    
    // Generate the seed from the mnemonic
    const seed = bip39.mnemonicToSeedSync(wallet.mnemonic, password);
    
    // Create a root key from the seed
    const root = bip32.fromSeed(seed, network);

    // Derive the master private key
    const xpvt = root.toBase58();

    // Derive the master public key
    const xpub = root.neutered().toBase58();

    console.log(`For mnemonic [${wallet.mnemonic}], the public key is [${xpub}] and private key is [${xpvt}]`);
    
    // Prepare data for API request
    const data = { "name": `${name}`, "extended_public_key": `${xpub}` };
    
    // Create an object with wallet details
    const walletWithId = {
      name: name,
      password: password,
      seed: seed,
      mnemonic: wallet.mnemonic,
      publicKey: xpub,
      privateKey: xpvt,
    }

    // Define the output path for storing wallet information
    const outputPath = path.join("cypherock_testnet", 'output', `wallets.json`);
    let walletsArray = [];
    
    if (fs.existsSync(outputPath)) {
      // If the file exists, read its content and parse it to get the existing wallets
      const fileContent = fs.readFileSync(outputPath, "utf8"); // Encoding standard
      walletsArray = JSON.parse(fileContent); // Parse the content into an array
    }
    
    // Add the new wallet to the array
    walletsArray.push(walletWithId);
    
    // Write the updated wallet array back to the file
    fs.writeFileSync(outputPath, JSON.stringify(walletsArray, null, 2));

    /* For Creating a wallet on testnet */
    const response = await axios.post(
      `https://api.blockcypher.com/v1/btc/test3/wallets/hd?token=${API}`,
      JSON.stringify(data)
    );
    
    console.log(response.data);
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}

module.exports = createWallet;

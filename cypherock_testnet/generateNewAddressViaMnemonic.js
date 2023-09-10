const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1');
const { BIP32Factory } = require('bip32');
const bip32 = BIP32Factory(ecc);
require('dotenv').config();
const createMnemonicFromBIP  = require("./createWalletFromBIP.js");

function generateAddressUsingMnemonic(name, password){
    try {
        const wallet = createMnemonicFromBIP(name, password); // BIP39 wallet will give mnemonic
        const network = bitcoin.networks.testnet; // For the Network

        const seed = bip39.mnemonicToSeedSync(wallet.mnemonic, password);
        const root = bip32.fromSeed(seed, network); 

        const xpub = root.neutered().toBase58(); // master public key
        // Derive the extended key
        const keyPair = bip32.fromBase58(xpub, network);
        // Get the public key hash (hashed version of the public key)
        const publicKeyHash = bitcoin.crypto.hash160(keyPair.publicKey);
        // Create the P2PKH address
        const p2pkhAddress = bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);
        console.log("An unused address is => " , p2pkhAddress);
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; // Re-throw the error for further handling, if needed
    }
}

// Uncomment and provide the necessary arguments to use the function
// generateAddressUsingMnemonic("Swayam", "SwayamKarle");

module.exports = generateAddressUsingMnemonic;

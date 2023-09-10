const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const ecc = require('tiny-secp256k1')
const { BIP32Factory } = require('bip32')
const bip32 = BIP32Factory(ecc);

function importWallet(mnemonic, password) {
    try {
        if (bip39.validateMnemonic(mnemonic)) {
            const network = bitcoin.networks.testnet;
            const seed = bip39.mnemonicToSeedSync(mnemonic, password);
            const root = bip32.fromSeed(seed, network);
            const xpvt = root.toBase58();
            const xpub = root.neutered().toBase58();
            console.log(`Mnemonic: ${mnemonic}\nPublic Key: ${xpub}\nPrivate Key: ${xpvt}`);
        } else {
            throw new Error("Invalid mnemonic provided.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        throw error; // Re-throw the error for further handling, if needed
    }
}

module.exports = importWallet;

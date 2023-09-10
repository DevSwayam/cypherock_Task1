#!/usr/bin/env node
const inquirer = require('inquirer');
const createWallet = require("./cypherock_testnet/createWallet.js");
const importWallet = require("./cypherock_testnet/importWallet.js");
const getWalletViaToken = require("./cypherock_testnet/listWalletTestnet.js")
const listWalletsFromLocal = require('./cypherock_testnet/listWalletsLocal.js')
const getAddressBalance = require('./cypherock_testnet/getAddressBalance.js')
const getTransactionsList = require('./cypherock_testnet/getListOfTransaction.js');
const generateUsableAddressOnTestNet = require('./cypherock_testnet/generateAddressViaApi.js');
const generateAddressUsingMnemonic = require('./cypherock_testnet/generateNewAddressViaMnemonic.js');
const createMnemonicFromBIP = require('./cypherock_testnet/createWalletFromBIP.js')

function tasksSelector(task) {
  switch (task) {
    case "task1":
      var prompt = inquirer.createPromptModule();
      prompt([{
        type: "input",
        name: "Cypherock_Tasks",
        message: "You have chosen Task 1. Please provide a name for your wallet. The default password is '1to8'."
      }]).then((answer) => {
        createWallet(answer.Cypherock_Tasks, "12345678")
      });
      break;
    case "task2":
      var prompt = inquirer.createPromptModule();
      prompt([{
        type: "input",
        name: "Cypherock_Tasks",
        message: "You have chosen Task 2. Please provide your 12-word mnemonic phrase. The default password is '1to8'."
      }]).then((answer) => {
        importWallet(answer.Cypherock_Tasks, "12345678")
      });
      break;
    case "task3":
      console.log("You have chosen Task 3. Here is your list of wallets associated with a token (API METHOD):")
      getWalletViaToken();
      break;
    case "task4":
      var prompt = inquirer.createPromptModule();
      prompt([{
        type: "input",
        name: "Cypherock_Tasks",
        message: "You have chosen Task 4. To get the balance, please provide an address on the testnet."
      }]).then((answer) => {
        getAddressBalance(answer.Cypherock_Tasks)
      });
      break;
    case "task5":
      var prompt = inquirer.createPromptModule();
      prompt([{
        type: "input",
        name: "Cypherock_Tasks",
        message: "You have chosen Task 5. To get a list of transactions, please provide an address on the testnet."
      }]).then((answer) => {
        getTransactionsList(answer.Cypherock_Tasks)
      });
      break;
    case "task6":
      console.log("You have chosen Task 6. Here is your unused address generated from the API:")
      generateUsableAddressOnTestNet();
      break;
    case "task7":
      console.log("You have chosen Task 7. Here is your list of wallets from local storage:")
      listWalletsFromLocal();
      break;
    case "task8":
      var prompt = inquirer.createPromptModule();
      prompt([{
        type: "input",
        name: "Cypherock_Tasks",
        message: "You have chosen Task 8. To get an unused address, please provide a name for the wallet. The default password is '1to8'."
      }]).then((answer) => {
        generateAddressUsingMnemonic(answer.Cypherock_Tasks, "12345678")
      });
      break;
    case "task9":
      var prompt = inquirer.createPromptModule();
      prompt([{
        type: "input",
        name: "Cypherock_Tasks",
        message: "You have chosen Task 9. To create a wallet from a mnemonic using BIP39, provide a wallet name. The default password is '1to8'."
      }]).then((answer) => {
        console.log(createMnemonicFromBIP(answer.Cypherock_Tasks, "12345678"))
      });
      break;
    default:
      console.log("Please provide a valid task between task[1-9]");
  }
}

console.log("Below, you will be asked a question to select which task you would like to perform:\n");
console.log("1. Check functionality of creating a wallet (use command: 'task1')");
console.log("2. Check functionality of importing a wallet (use command: 'task2')");
console.log("3. Check functionality of listing wallets done via API Token(use command: 'task3')");
console.log("4. Check functionality of getting the balance of a wallet (use command: 'task4')");
console.log("5. Check functionality of getting a list of Bitcoin transactions of a wallet (use command: 'task5')");
console.log("6. Check functionality of generating an unused Bitcoin address via API (use command: 'task6')");
console.log("7. Check functionality of listing wallets generated in local storage (use command: 'task7')");
console.log("8. Check functionality of generating an unused address via mnemonic (use command: 'task8')");
console.log("9. Check functionality of generating a new wallet via mnemonic (use command: 'task9')");

const prompt = inquirer.createPromptModule();
prompt([{
    type: "input",
    name: "Cypherock_Tasks",
    message: "Which task would you like to check?"
}]).then((answers) => {
    const task = answers.Cypherock_Tasks;
    tasksSelector(task);
})

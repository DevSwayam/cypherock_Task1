const fs = require("fs");

// Function to read and merge JSON files
function listWalletsFromLocal() {
  try {
    const fileContent = fs.readFileSync(
      "cypherock_testnet/output/wallets.json",
      "utf8"
    );
    console.log(JSON.parse(fileContent));
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}

module.exports = listWalletsFromLocal;

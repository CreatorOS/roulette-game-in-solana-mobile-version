const { generateWallet } = require('../src/solana');
const fs =require('fs');

const main = async () => {

    const wallet1 = generateWallet();
    const wallet2 = generateWallet();
    console.log(wallet1._keypair.secretKey)
    const wallets = {
      s1: Array.from(wallet1._keypair.secretKey),
      s2: Array.from(wallet2._keypair.secretKey),
    }
    const data = JSON.stringify(wallets);
    try {
      fs.writeFileSync('wallets.json', data);
    } catch (error) {
      console.log(error);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
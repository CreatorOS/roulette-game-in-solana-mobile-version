const { Keypair} = require('@solana/web3.js');
const { generateWallet, getWalletBalance, transferSOL, airDropSol } = require('../src/solana');
const fs = require('fs');

const main = async () => {
    try {

      const wallets = JSON.parse((fs.readFileSync('wallets.json', 'utf-8')).toString());
      const wallet1=Keypair.fromSecretKey(Uint8Array.from(wallets.s1));
      const wallet2=Keypair.fromSecretKey(Uint8Array.from(wallets.s2));
      
      await airDropSol(wallet1, 5);
      await transferSOL(wallet1, wallet2, "0" );
    } catch (error) {
     console.log(error) 
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
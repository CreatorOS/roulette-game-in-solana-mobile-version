const {Keypair} = require('@solana/web3.js');
const { generateWallet, getWalletBalance, transferSOL, airDropSol } = require('../src/solana');
const fs = require('fs');

const main = async () => {
  
    try {

      const wallets = JSON.parse((fs.readFileSync('wallets.json', 'utf-8')).toString());
      const wallet1=Keypair.fromSecretKey(Uint8Array.from(wallets.s1));
      const wallet2=Keypair.fromSecretKey(Uint8Array.from(wallets.s2));
      
      console.log('Transferring 3 SOL in wallet 2...');
      await transferSOL(wallet1, wallet2, "3" );
      const wallet1Balance = await getWalletBalance(wallet1._keypair.publicKey);
      const wallet2Balance = await getWalletBalance(wallet2._keypair.publicKey);
      console.log('Wallet 1 Balance: ',wallet1Balance);
      console.log('Wallet 2 Balance: ',typeof wallet2Balance, wallet2Balance);
      if (wallet2Balance >= 3) {
          console.log('Test Passed');
          process.exit(0);
      } else {
          console.log('Test Failed');
          process.exit(1);
      }
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
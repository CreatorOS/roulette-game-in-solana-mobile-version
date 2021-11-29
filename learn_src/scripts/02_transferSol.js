const { generateWallet, getWalletBalance, transferSOL, airDropSol } = require('../src/solana');

const main = async () => {

    const wallet1 = generateWallet();
    const wallet2 = generateWallet();
    console.log('Airdroping 5 SOL in wallet 1...');
    await airDropSol(wallet1, 5);
    console.log('Transferring 3 SOL in wallet 2...');
    await transferSOL(wallet1, wallet2, "3" );
    const wallet1Balance = await getWalletBalance(wallet1._keypair.publicKey);
    const wallet2Balance = await getWalletBalance(wallet2._keypair.publicKey);
    console.log('Wallet 1 Balance: ',wallet1Balance);
    console.log('Wallet 2 Balance: ',wallet2Balance);
    if (wallet2Balance !== 3) {
        console.log('Test Failed');
        process.exit(1);
    } else {
        console.log('Test Passed');
        process.exit(0);
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
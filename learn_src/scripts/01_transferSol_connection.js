const { generateWallet, getWalletBalance, transferSOL, airDropSol } = require('../src/solana');

const main = async () => {

    const wallet1 = generateWallet();
    const wallet2 = generateWallet();
    await airDropSol(wallet1, 5);
    await transferSOL(wallet1, wallet2, "0" );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
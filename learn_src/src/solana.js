const web3=require("@solana/web3.js");

const generateWallet = () => {
    const newPair = new web3.Keypair();
  
    publicKey = new web3.PublicKey(newPair._keypair.publicKey).toString();
    secretKey = newPair._keypair.secretKey;
  
    return newPair;
}

const getWalletBalance=async (pubk)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const balance=await connection.getBalance(new web3.PublicKey(pubk));
        return balance/web3.LAMPORTS_PER_SOL;
    }catch(err){
        console.log(err);
    }
}

const transferSOL=async (from,to,transferAmt)=>{
    try{
        
    }catch(err){
        console.log(err);
    }
}

const airDropSol=async (wallet,transferAmt)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        // const walletKeyPair=await web3.Keypair.fromSecretKey(Uint8Array.from())
        const fromAirDropSignature=await connection.requestAirdrop(new web3.PublicKey(wallet.publicKey.toString()),transferAmt*web3.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
    }catch(err){
        console.log(err);
    }
}

module.exports={
    getWalletBalance,
    transferSOL,
    airDropSol,
    generateWallet
}
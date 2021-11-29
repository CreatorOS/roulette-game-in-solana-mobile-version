# Creating a Roulette Game 
Welcome quest masters. After learning how to airdrop SOL to your wallet, let us build something interesting. In this quest you will learn how to get the wallet Balance, and transfer SOL to a wallet, all by creating an amazing Roulette Game. 
By the end of this quest, you will be ready to build more advanced things on Solana blockchain using its npm packages. 

## Game Overview and Project Initialization 
Information to be provided by user:
- `Public Key` & `Secret Key` of Wallet 
- `Amount` of SOL to be staked
- `Ratio` of stake
- Guess `Number` between 1 to 5

On successful win, the user will get the prize money (`Amount`*`Ratio`) in their wallet.

`NOTE:` Only a  maximum of `2.5 SOL` can be staked during a single guess. 

## @solana/web3.js

Solana nodes accept HTTP requests using the JSON-RPC 2.0 specification.
To interact with a Solana node inside a Javascript application, we use the `solana-web3.js` library. It is available in the form of npm package as `@solana/web3.js`. 

We have already declared a variable for that installed package. 
```
const web3 = require("@solana/web3.js");
```

## Transaction Overview
For making a successful transaction, the things needed:
- `Public Key` of the from wallet address
- `Public Key` of the to wallet address
- `Amount` to be transferred 
- `From Wallet` instance for the signer

Initially, the participation amount will be from the user wallet and transferred to a `treasuryWallet`, whose secret key and wallet instance is already available. Thus, we can execute a transaction now. First, we will be creating a new transaction object. Then, we will be sending that transaction to another user and add our signature to it.

## Establishing Connection  
First, we will establish a connection to a particular network on Solana. We use the `Connection` method from web3.js library. For this quest, we will be connected to the `devnet`. The connection constructor takes in a string representation of endpoint URL and commitment level. The end point URL can be specified using the `clusterApiUrl()` function which will return the current live endpoint to the Solana network we provide.
For our case, we will be using the `devnet` network. The code for connection will look like this, type this out in `transferSol()` function:
```
const connection=new web3.connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
console.log("RPC endpoint:", connection._rpcEndpoint);
```
Hit `Save` and `Run`.
The console output 1 will print the _rpcEndpoint value as `https://api.devnet.solana.com`.

## Creating Transaction
We can start with creating a empty Transaction object. And, then we will add instructions to the Transaction object. `SystemProgram.transfer()` method is responsible for sending the funds from one account to another. It takes several arguments:
- fromPubkey: the public key of the account that we are sending funds from
- toPubkey: the public key of the account that is receiving funds from the transaction
- lamports: the amount of lamports to be sent. ( `1 SOL = 1000000000 lamports`)
The transaction variable will look like this, code this in `transferSOL()` function:
```
const transaction=new web3.Transaction().add(
    web3.SystemProgram.transfer({
        fromPubkey:new web3.PublicKey(from.publicKey.toString()),
        toPubkey:new web3.PublicKey(to.publicKey.toString()),
        lamports:web3.LAMPORTS_PER_SOL
    })
);
```

## Signing the Transaction

We will now need to authorize the transaction by signing it with our Secret key. The signatures signal on-chain programs that the account holder has authorized the transaction. We will create a signature constant, which will store the result from `sendAndConfirmTransaction()` function.  This function accepts several arguments: 
-  connection: the connection instance 
-  transaction: the transaction constant created at the top
-  [signers]: the wallet instance of all the signers for the transaction

`NOTE:` There is also another parameter called commitment option, if it is not specified, the max commitment option will be used. 

The signature variable will look like this:
```
const signature=await web3.sendAndConfirmTransaction(
    connection, 
    transaction,
    [fromWalletInstance]
);
console.log('Signature is ',signature);
return signature;
```
If successful, the transaction signature is printed out. 

Here, the parameters for the function is: 
- `from` refers to the from wallet instance
- `to` refers to the to wallet instance
- `transferAmt` refers to the amount in SOL to be transferred during the transaction. 

Hit `Save` and `Run` to test what we have written so far.
You should see in the 2nd test output, we transferred 3 SOLs from `wallet1` to `wallet2`.

## Getting Wallet Balance

The wallet balance can be also found from the `Public Key` of the wallet using the `Connection` object. First, we establish the connection and store it in a connection variable. Then, we use the function `getBalance()` and pass in the public key. We get the balance in `LAMPORTS`. To get the balance in SOL, we divide the balance by `LAMPORTS_PER_SOL`. The resultant function will be:
You don't need to code it out as we already wrote the same function in earlier quest.
```
const getWalletBalance=async (pubk)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const balance=await connection.getBalance(new web3.PublicKey(pubk));
        return balance/web3.LAMPORTS_PER_SOL;
    }catch(err){
        console.log(err);
    }
}
```

## Project Structure

Note:
- You can select and view another file by clicking on `...` three dots menu.

In the main file of `index.js`, we define all the other packages in use for printing messages in the console. (like `chalk`, `inquirer`,`figlet`). Also, the function for execution of game (namely `gameExecution()` is defined in the file). Some functions which are help during the game are defined in a file named `helper.js`. 
We require all the helper functions in the `index.js` file using the following instruction:
```
const { getReturnAmount, totalAmtToBePaid, randomNumber } = require('./helper');
```
- `getReturnAmount` function returns the total amount the player will get if his/her guess is correct.
- `totalAmtToBePaid` function returns the total amount to be paid by the player for each game.
- `randomNumber` function generates a number between the defined range of [min,max] passed as parameter.

The functions dealing with the Solana network are defined in a separate file named `solana.js`. We require these functions in the `index.js` file using the following line:
```
const {getWalletBalance,transferSOL,airDropSol}=require("./solana");
```
- `generateWallet` function create a new public-private keypair and returns it
- `getWalletBalance` function returns the balance of wallet passed as argument
- `transferSOL` function contains the transfer instruction (for transfering SOL from one wallet to another)
- `airDropSol` function is used to airdrop Lamports on to the wallet (works only in the `devnet`)


## Running Application

Hit `Run` and check 3rd test output to see how the whole game plays out.

It should be similar to output from one of the below outputs.

![Losing Game](https://raw.githubusercontent.com/vamsi937/roulette_game_in_solana/main/learn_assets/3_failed_game.png)

![Winning Game](https://raw.githubusercontent.com/vamsi937/roulette_game_in_solana/main/learn_assets/4_successful_game.png)

## Conclusion

Congratulations, you have now learned how to perform a transaction on Solana network. 



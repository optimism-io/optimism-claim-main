const axios = require("axios").default;
const ethers = require("ethers");

const ABI = [
    "function claim(uint256 index, address account, uint256 amount, bytes32[] merkleProof)"
]


// Dummy private key, replace with your own.
// Dummy private key, replace with your own.
// Dummy private key, replace with your own.
// Dummy private key, replace with your own.
// Dummy private key, replace with your own.
const PRIVATE_KEY = "0x50525bae104868aa5643439133fb837bd50d5dc24a5ed9417d3e1742bb7482df"

async function main() {
    const provider = new ethers.providers.StaticJsonRpcProvider("https://opt-mainnet.g.alchemy.com/v2/RhvZElGdXE-YPVQCx5EzJ2_YDd9lABsG");

    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const address = await wallet.getAddress();

    const claim = await axios.get(`https://gateway-backend-mainnet.optimism.io/proof/${address}`);
    const { index, amount, proof } = claim.data;

    const contract = new ethers.Contract("0xeC1a5B39c88741cf84a705B9d0188C2Ce2c3aEEb", ABI, wallet);
    const transaction = await contract.claim(index, address, amount, proof);

    console.log(`Submitted transaction - https://optimistic.etherscan.io/tx/${transaction.hash}`);

    await transaction.wait();

    console.log("Claimed Optmisim airdrop");
}

main();
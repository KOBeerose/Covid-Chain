//definitions
const Web3 = require("web3")
const fs = require('fs');


const web3 = new Web3("http://localhost:8545")
const contract = JSON.parse(fs.readFileSync('./build/contracts/CovidVacPass.json', 'utf8'));
const NameContract = new web3.eth.Contract(contract.abi, "0x843592443c73BA01835868dD0Da74eE623138B8b");

async function scanForPass(qrCode) {
return result =  await NameContract.methods.scanForPass(qrCode).call();
}
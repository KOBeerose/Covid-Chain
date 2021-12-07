//definitions

const Web3 = require("web3")
const fs = require('fs');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json(),cors());


const web3 = new Web3("http://localhost:8545")
const contract = JSON.parse(fs.readFileSync('./build/contracts/CovidVacPass.json', 'utf8'));
const NameContract = new web3.eth.Contract(contract.abi, "0x843592443c73BA01835868dD0Da74eE623138B8b");
let result;

async function scanForPass(qrCode) {
    return result =  await NameContract.methods.scanForPass(qrCode).call();
}


app.post('/', function(req, res){


    scanForPass(req.body.result).then( v =>  {
        res.send(200, {"result": v})
    })
 
  });


app.listen(5000);
console.log ("web server at port 5000 is running..")





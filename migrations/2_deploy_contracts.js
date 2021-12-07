var CovidVacPass = artifacts.require("./CovidVacPass")
module.exports = function(deployer){
    deployer.deploy(CovidVacPass);
}
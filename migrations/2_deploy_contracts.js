var Cardgenerator = artifacts.require("./Cardgenerator.sol");

module.exports = function(deployer) {
  deployer.deploy(Cardgenerator);
};

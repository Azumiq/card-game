// Create an abstraction of the smart contract so truffle can interact with it
var Cardownership = artifacts.require("./Cardownership.sol");

// Declare the contract
contract("CardOwnership", function(accounts) {


    // Name the test and initialize it
    it("Smart contract owner is the uploader address", function () {
        // Create an instance of our contract and return the owner of the contract
        return Cardgenerator.deployed().then(function (instance) {
            return instance.owner();
            // Use the owner for the assertion and check if it matches web3.accounts[0]
        }).then(function (contractOwner) {
            assert.equal(contractOwner, web3.eth.accounts[0]);
        });
    });
});
// Create an abstraction of the smart contract so truffle can interact with it
var Cardgenerator = artifacts.require("./Cardgenerator.sol");

// Declare the contract
contract("Cardgenerator", function(accounts) {

    // Name the test and initialize it
    it("Cards are generated and bound to an account", function() {
        // Create an instance of our contract and return the greeting
        return Cardgenerator.deployed().then(function(instance) {
            return instance.createRandomCard();
        // Use the greeting for the assertion and check if it matches the string
        }).then(function(greet) {
            assert.equal(greet, "Hello World");
        });
    });
});

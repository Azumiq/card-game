// Create an abstraction of the smart contract so truffle can interact with it
var Cardgenerator = artifacts.require("./Cardgenerator.sol");

// Declare the contract
contract("Cardgenerator", function(accounts) {

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

    it("Constructor for setting cardPackPrice is working correctly", function () {
        return Cardgenerator.deployed().then(function (instance) {
            return instance.cardPackCost(); 
        }).then(function (price) {
            assert.equal(price, web3.toWei("3", "ether"));
        });
    });

    it("Constructor for setting startingDeck size is working correctly", function () {
        return Cardgenerator.deployed().then(function (instance) {
            return instance.startingDeck();
        }).then(function (deck) {
            assert.equal(deck, 10);
        });
    });

    it("Constructor for setting cardPackSize is working correctly", function () { 
        return Cardgenerator.deployed().then(function (instance) {
            return instance.cardPackSize();
        }).then(function (pack) {
            assert.equal(pack, 5);
        });
    });

    it("A starting deck of 10 cards can be generated", function () {
        return Cardgenerator.deployed().then(function (instance) {
            return instance.createStartingDeck();
        });
        return Cardgenerator.deployed().then(function (instance) {
            return instance.globalCardCount();
        }).then(function (count) {
            assert.equal(count, 10);
        });
    });

    it("The first card belongs to the right account", function () {
        return Cardgenerator.deployed().then(function (instance) {
            return instance.cardToOwner(0);
        }).then(function (card) {
            assert.equal(card, web3.eth.accounts[0]);
        });
    });

    it("The account that generated a starting deck has 10 cards", function () {
        return Cardgenerator.deployed().then(function (instance) {
            return instance.ownerCardCount(web3.eth.accounts[0]);
        }).then(function (ownerCardsCount) {
            assert.equal(ownerCardsCount, 10);
        });
    });

    it("Is possible to pay for a cardpack", function() {
        return Cardgenerator.deployed().then(function(instance) {
            return instance.buyCardPacks(1, { from: web3.eth.accounts[0], value: web3.toWei('3', 'ether')});        
        })
        return Cardgenerator.deployed().then(function(instance) {
            return instance.ownerCardCount(web3.eth.accounts[0]);
        }).then(function(ownerCardsCount) {
          assert.equal(ownerCardsCount, 15);
        });
    });

    it("Is possible to pay for a cardpack from a different address than web3.eth.accounts[0]", function() {
        return Cardgenerator.deployed().then(function(instance) {
            return instance.buyCardPacks(1, { from: web3.eth.accounts[1], value: web3.toWei('3', 'ether')});
        })
        return Cardgenerator.deployed().then(function(instance) {
            return instance.ownerCardCount(web3.eth.accounts[1]);
        }).then(function(ownerCardsCount) {
            assert.equal(ownerCardsCount, 5);
        });
    });

    it("It is possible to pay for multiple cardpacks", function() {
      return Cardgenerator.deployed().then(function(instance) {
        return instance.buyCardPacks(3, {
          from: web3.eth.accounts[2],
          value: web3.toWei("9", "ether")
        });
      });
      return Cardgenerator.deployed()
        .then(function(instance) {
          return instance.ownerCardCount(web3.eth.accounts[3]);
        })
        .then(function(ownerCardsCount) {
          assert.equal(ownerCardsCount, 15);
        });
    });

    it("The balance of the smartcontract is correct after the transactions", function() {
      return Cardgenerator.deployed()
        .then(function(instance) {
          return instance.getBalance();
        }).then(function(contractBalance) {
          assert.equal(contractBalance, web3.toWei("15", "ether"));
        });
    });
});

pragma solidity ^0.4.19;

contract Cardgenerator {

    //Event for new card creation
    event NewCard(uint cardId, uint dna);
    
    //Parameters to define amount of digits, the modulus and the amount of cards in a starting deck
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint startingDeck = 10;
    uint cardPack = 5;
    uint cardPackCost = 3;

    uint public globalCardCount;

    //Card characteristics
    struct Card {
        uint dna;
    }
    
    //Array of all cards created
    Card[] public cards;

    mapping (uint => address) public cardToOwner;
    mapping (address => uint ) public ownerCardCount;

    //Create a new card by passing dna, assign to msg.sender and trigger New Card event
    //Card id = position-1 in card array
    function _createCard(uint _dna) private {
        uint id = cards.push(Card(_dna)) - 1;
        cardToOwner[id] = msg.sender;
        ownerCardCount[msg.sender]++;
        emit NewCard(id, _dna);
        globalCardCount++;
    }

    //Generate (semi)random dna from a string using keccak256 and revert to needed amount of digits
    function _generateRandomDna(uint _time, uint _nonce) private view returns (uint) {
        uint hashInput = _time * _nonce;
        uint rand = uint(keccak256(hashInput));
        return rand % dnaModulus;
    }

    //Create a random card when account has no cards
    //(add randomly generated name based upon cardtype)
    function createRandomCard() public {
        require(ownerCardCount[msg.sender] == 0);
        uint _nonce = 1;
        for (uint i = 0; i < startingDeck; i++) {
            uint randDna = _generateRandomDna(block.timestamp, _nonce);
            _createCard(randDna);
            _nonce++;
            }
    }
}
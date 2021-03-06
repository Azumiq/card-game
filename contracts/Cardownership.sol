pragma solidity ^0.4.19;

import "./Cardgenerator.sol";

contract Cardownership is Cardgenerator {
    
    event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    mapping (uint => address) cardApprovals;
    
    modifier onlyOwnerOf(uint _cardId) {
        require(msg.sender == cardToOwner[_cardId]);
        _;
    }

    function balanceOf(address _owner) external view returns (uint256 _balance) {
        return ownerCardCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address _owner) {
        return cardToOwner[_tokenId];
    }
// Ga hier verder met ERC721 implementatie
    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerCardCount[_to]++;
        ownerCardCount[_from]--;
        cardToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        cardApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(cardApprovals[_tokenId] == msg.sender);
        address _owner = cardToOwner[_tokenId];
        _transfer(_owner, msg.sender, _tokenId);
    }
}
pragma solidity ^0.4.19;

import "./Cardgenerator.sol";
import "./ERC721.sol";

contract CardOwnership is Cardgenerator, ERC721 {
    
    mapping (uint => address) cardApprovals;
    
    modifier onlyOwnerOf(uint _cardId) {
        require(msg.sender == cardToOwner[_cardId]);
        _;
    }

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerCardCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return cardToOwner[_tokenId];
    }

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
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }
}
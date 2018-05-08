pragma solidity ^0.4.19;

contract Priced {
    modifier costs(uint price) {
        if (msg.value == price) {
            _;
        }
    }
}

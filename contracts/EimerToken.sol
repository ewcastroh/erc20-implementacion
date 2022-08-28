// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EimerToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("EimerToken", "EMR") {
        _mint(msg.sender, initialSupply * (10**decimals()));
    }

    function decimals() public pure override returns (uint8) {
        return 6;
    }
}

//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Company {
    uint256[] Products;

    mapping(uint256 => bool) hashcodeToTrue;

    address owner;

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function addProducts(address _ownerAddress, uint256[] memory _products)
        public
        returns (string memory)
    {
        require(_ownerAddress == owner);
        uint256 i;

        for (i; i < _products.length; i++) {
            Products.push(_products[i]);
            hashcodeToTrue[_products[i]] = true;
        }

        return "Products added";
    }

    function verifyProduct(uint256 _hashcode)
        public
        view
        returns (string memory)
    {
        if (hashcodeToTrue[_hashcode]) {
            return "Authenticated";
        } else {
            return "Counterfeit";
        }
    }
}

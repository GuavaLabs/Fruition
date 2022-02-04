# Fruition
Repository for Fruition On Demand NFT minting web application

# Architectural Design
<img width="1280" alt="Fruition Application Architecture Diagram" src="https://user-images.githubusercontent.com/11862392/152111644-e616ac40-e120-43d3-92e4-69916e57edb1.png">

# Change Log

## 1.0
* Created Skeleton in index.js
* Added Images
* Styled header, section 1 and added images

#Testing

* Asset.sol containing function _mintFor(address user, uint256 id, bytes memory) 
*   has been deployed to Ropsten test network.
*   Etherscan tnx: https://ropsten.etherscan.io/tx/0x4d6d49477b4d08a4ffaf4a2efc77e899f4ca87609b2f87aa66c63aee6840c66b
* Constructor for Asset.sol: constructor(address _owner, string memory _name, string memory _symbol, address _imx)
*   has been deployed with corresponding params(0xD2d8d0136Dced12C960FDB401657d6Ce53E08451, "Guava Test NFT", "GTN", 0x68e6217A0989c5e2CBa95142Ada69bA1cE2cdCA9)
*   address _imx = 0x68e6217A0989c5e2CBa95142Ada69bA1cE2cdCA9 as "Registration" Public Test (Ropsten) address, may need to use Registration instead.
* Please see image below.

![image](https://user-images.githubusercontent.com/11862392/152404844-254d5e6e-79a0-4dc0-b738-0520179130b7.png)


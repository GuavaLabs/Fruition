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
*   Etherscan tnx: https://ropsten.etherscan.io/address/0x6857033f9442725bb27d653B0906Bd4ef5f91a52
* Constructor for Asset.sol: constructor(address _owner, string memory _name, string memory _symbol, address _imx)
*   has been deployed with corresponding params(0xBc78d7850c66c29e0Af746ECFCB3eb226158D03B, "Guava Test Token", "GTT", 0x4527be8f31e2ebfbef4fcaddb5a17447b27d2aef)
*   address _imx = 0x4527be8f31e2ebfbef4fcaddb5a17447b27d2aef as "Core" Public Test (Ropsten) address, may need to use Registration instead.
* Please see image below.

![image](https://user-images.githubusercontent.com/11862392/152404844-254d5e6e-79a0-4dc0-b738-0520179130b7.png)


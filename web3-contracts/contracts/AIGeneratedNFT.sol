// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
 * AI Generated NFT Collection
 * Features:
 * - ERC721 NFT
 * - ERC721URIStorage metadata
 * - ERC2981 royalties
 * - Burnable NFTs
 * - AI prompt storage
 * - Owner minting
 * - Public minting
 * - Supply limit
 * - Pausable contract
 * - Reentrancy protection
 */

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract AIGeneratedNFT is
    ERC721URIStorage,
    ERC2981,
    Ownable,
    ReentrancyGuard,
    Pausable
{
    // =============================================================
    //                           VARIABLES
    // =============================================================

    uint256 public nextTokenId;

    uint256 public mintPrice = 0.01 ether;

    uint256 public maxSupply = 10000;

    string public collectionDescription;

    // =============================================================
    //                           STRUCTS
    // =============================================================

    struct NFTMetadata {
        string name;
        string imageUrl;
        string prompt;
    }

    // =============================================================
    //                           STORAGE
    // =============================================================

    mapping(uint256 => NFTMetadata) private nftData;

    // =============================================================
    //                           EVENTS
    // =============================================================

    event NFTMinted(
        address indexed to,
        uint256 indexed tokenId,
        string name,
        string imageUrl,
        string prompt
    );

    event MintPriceUpdated(uint256 newPrice);

    event MaxSupplyUpdated(uint256 newSupply);

    // =============================================================
    //                         CONSTRUCTOR
    // =============================================================

    constructor(
        string memory _description,
        address royaltyReceiver,
        uint96 royaltyFeeNumerator
    )
        ERC721("AI Generated NFT", "AINFT")
        Ownable(msg.sender)
    {
        collectionDescription = _description;

        // Royalty setup
        _setDefaultRoyalty(
            royaltyReceiver,
            royaltyFeeNumerator
        );
    }

    // =============================================================
    //                         OWNER MINT
    // =============================================================

    function ownerMint(
        address to,
        string memory name,
        string memory imageUrl,
        string memory prompt,
        string memory metadataURI
    )
        external
        onlyOwner
    {
        _mintNFT(
            to,
            name,
            imageUrl,
            prompt,
            metadataURI
        );
    }

    // =============================================================
    //                         PUBLIC MINT
    // =============================================================

    function publicMint(
        string memory name,
        string memory imageUrl,
        string memory prompt,
        string memory metadataURI
    )
        external
        payable
        nonReentrant
        whenNotPaused
    {
        require(
            msg.value >= mintPrice,
            "Insufficient payment"
        );

        _mintNFT(
            msg.sender,
            name,
            imageUrl,
            prompt,
            metadataURI
        );
    }

    // =============================================================
    //                         INTERNAL MINT
    // =============================================================

    function _mintNFT(
        address to,
        string memory name,
        string memory imageUrl,
        string memory prompt,
        string memory metadataURI
    )
        internal
    {
        require(
            nextTokenId < maxSupply,
            "Max supply reached"
        );

        uint256 tokenId = nextTokenId;

        _safeMint(to, tokenId);

        _setTokenURI(tokenId, metadataURI);

        nftData[tokenId] = NFTMetadata({
            name: name,
            imageUrl: imageUrl,
            prompt: prompt
        });

        emit NFTMinted(
            to,
            tokenId,
            name,
            imageUrl,
            prompt
        );

        nextTokenId++;
    }

    // =============================================================
    //                         VIEW FUNCTIONS
    // =============================================================

    function getNFTData(
        uint256 tokenId
    )
        external
        view
        returns (
            string memory name,
            string memory imageUrl,
            string memory prompt
        )
    {
        require(
            _ownerOf(tokenId) != address(0),
            "NFT does not exist"
        );

        NFTMetadata memory data = nftData[tokenId];

        return (
            data.name,
            data.imageUrl,
            data.prompt
        );
    }

    function totalSupply()
        external
        view
        returns (uint256)
    {
        return nextTokenId;
    }

    // =============================================================
    //                         ADMIN FUNCTIONS
    // =============================================================

    function setMintPrice(
        uint256 _newPrice
    )
        external
        onlyOwner
    {
        mintPrice = _newPrice;

        emit MintPriceUpdated(_newPrice);
    }

    function setMaxSupply(
        uint256 _newSupply
    )
        external
        onlyOwner
    {
        require(
            _newSupply >= nextTokenId,
            "Already minted beyond supply"
        );

        maxSupply = _newSupply;

        emit MaxSupplyUpdated(_newSupply);
    }

    function pause()
        external
        onlyOwner
    {
        _pause();
    }

    function unpause()
        external
        onlyOwner
    {
        _unpause();
    }

    // =============================================================
    //                         BURN FUNCTION
    // =============================================================

    function burn(
        uint256 tokenId
    )
        external
    {
        require(
            ownerOf(tokenId) == msg.sender,
            "Not NFT owner"
        );

        _burn(tokenId);

        delete nftData[tokenId];
    }

    // =============================================================
    //                         WITHDRAW
    // =============================================================

    function withdraw()
        external
        onlyOwner
        nonReentrant
    {
        uint256 balance = address(this).balance;

        require(
            balance > 0,
            "No balance"
        );

        (bool success, ) = payable(owner()).call{
            value: balance
        }("");

        require(
            success,
            "Withdraw failed"
        );
    }

    // =============================================================
    //                      ROYALTY SUPPORT
    // =============================================================

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(
            ERC721URIStorage,
            ERC2981
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // =============================================================
    //                      OVERRIDES
    // =============================================================

    function _burn(
        uint256 tokenId
    )
        internal
        override(ERC721URIStorage)
    {
        super._burn(tokenId);

        _resetTokenRoyalty(tokenId);
    }
}

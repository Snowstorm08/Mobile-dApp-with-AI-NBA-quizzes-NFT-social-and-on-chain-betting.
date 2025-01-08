# DunkVerse

**DunkVerse** is a blockchain-powered sports engagement platform that combines AI-generated quizzes, NFT auctions, GameFi, and SocialFi to create an immersive and interactive experience for sports fans.

![Screenshot 2025-01-01 232234](https://github.com/user-attachments/assets/0ba29509-c9e9-400d-8152-047278da6b00)

![Screenshot 2025-01-01 232257](https://github.com/user-attachments/assets/034235a5-5c39-4563-88b3-92bd31187393)

## Features 🚀

### 1. **NFT-Powered Content**
- Videos uploaded by users are automatically minted as NFTs.
- NFTs can be auctioned in a decentralized betting pool, with the highest or smartest bidder winning the asset.
- Live story-like features enable dynamic viewing experiences for fans.

### 2. **AI-Generated Quizzes**
- Quizzes are generated based on real-time NBA TopShots matches, focusing on the players and teams participating in the current game.
- Fans can win NFTs and other rewards by participating in these interactive quizzes.

### 3. **Unified Token Economy**
- Transactions are powered by **$FTO (DunkVerse Token)**, which is equivalent to:
  - 1 $opBNB , 1 $ETH
- Simplifies transactions on each chain and promotes ecosystem interoperability.

### 4. **Decentralized Betting Pool**
- Fair and transparent NFT auctions ensure trust among bidders.
- Smart contracts govern the auction process to ensure security.

### 5. **Social Connectivity**
- Invite friends using **On-chain wallet ping**.
- Real-time leaderboard displays top-performing players in live quizzes.
- View the average market value of NFTs on the platform.

## Deployed and Verified Contracts

| Contract Name        | Description                                   | opBNB Testnet Deployed and Verified Contract Links                               |
|----------------------|-----------------------------------------------|----------------------------------------------------------------------------------|
| `DunkVerse.sol`      | ERC-20 token contract for $FTO.               | https://testnet.opbnbscan.com/address/0x74F50199618ab213CdBA4b07dd7dd6614DC004B3 |
| `BettingPool.sol`    | Handles GameFi betting logic.                 | https://testnet.opbnbscan.com/address/0xEb2bcb5A262904157B33895C86f7E58e445a1B3F |
| `AIGeneratedNFT.sol` | Manages NFT generation, supply, and transfers.| https://testnet.opbnbscan.com/address/0xb98f9e73748Ac0B5275141E878faB653b4A0cAc8 |
| `InviteFriends.sol`  | Manages on-chain invitation and rewards.      | https://testnet.opbnbscan.com/address/0x4d086aa65A7eA9eB094aEe92E55b9C80052fE6C2 |

| Contract Name        | Description                                   | Ancient8 Testnet Deployed and Verified Contract Links                                              |
|----------------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------|
| `DunkVerse.sol`      | ERC-20 token contract for $FTO.               | https://scanv2-testnet.ancient8.gg/address/0xb8171c4E2002Deea048477D8B337ff27F9a36687?tab=txs      |
| `BettingPool.sol`    | Handles GameFi betting logic.                 | https://scanv2-testnet.ancient8.gg/address/0xac13628e37628E8e8d9238F1564841cf220742a3?tab=contract |
| `AIGeneratedNFT.sol` | Manages NFT generation, supply, and transfers.| https://scanv2-testnet.ancient8.gg/address/0x164D1bBaD8De402b80f65fCa468CacF294865ca7?tab=contract |
| `InviteFriends.sol`  | Manages on-chain invitation and rewards.      | https://scanv2-testnet.ancient8.gg/address/0x380Fdcfc444Eff5D48f3d5D7C08Fa19bE94867f2?tab=contract |

## Key Technologies

- **Blockchain**: opBNB
- **AI**: DALL-E3 GPT OpenAI Models for real-time quiz generation
- **Oracles**: Third-party oracles API for live Top Shots NBA match data
- **Smart Contracts**: Solidity
- **Frontend**: React.js, TypeScript, TailwindCSS
- **Storage**: Pinata
- **Wallet Integration**: RainbowKit, Wagmi, Metamask APIs
- **Tokenomics**: ERC-20, ERC-721 standard for $FTO token and NFTs

## Tokenomics on opBNB 📊

- **Symbol**: $FTO (DunkVerse Token)
- **Supply**: 10 billion tokens
- **Utility**:
  - Place bids in NFT auctions.
  - Participate in quizzes.
  - Peer-to-peer transactions for social and gaming features.

## How It Works

1. **User Onboarding**:
   - Connect Wallet via MetaMask.
   - Receive $FTO tokens if you have a metamask-to-metamask invitation.

![Screenshot 2025-01-01 232411](https://github.com/user-attachments/assets/67c0dcd8-6502-4123-8cce-eba32613e35e)

2. **Participation**:
   - Join AI-generated quizzes.
   - Bet on outcomes using $FTO.

![Screenshot 2025-01-01 232453](https://github.com/user-attachments/assets/8a8d0b96-edda-43de-9bab-e8b51af2da90)

3. **Rewards**:
   - Win AI-generated NFTs and leaderboard points.
   - Redeem rewards directly in the ecosystem.

4. **Social Engagement**:
   - Invite friends and earn rewards.
   - Compete on the leaderboard.

![Screenshot 2025-01-01 232528](https://github.com/user-attachments/assets/074c29ed-9ac1-4f81-86af-6f7d57302403)

## Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/AmaanSayyad/DunkVerse-BNB.git
   ```
2. Install dependencies:
   ```bash
   cd DunkVerse
   yarn install
   ```
3. Start the frontend:
   ```bash
   yarn run dev
   ```
4. Access the application at `http://localhost:3000`.

## **Business Model, Market Opportunity and Revenue**

![Screenshot 2025-01-01 232600](https://github.com/user-attachments/assets/7999c4ae-d457-44e8-a6fa-773e2cc4f789)

![Screenshot 2025-01-01 233000](https://github.com/user-attachments/assets/0d2b8a73-e37c-44f9-8ec6-04e70cca5df6)

## **Future Enhancements**
- Enable more complex betting logic, build 16 new features and launch v2 in the telegram mini-app.
- Integrate $FTO token with Apple Pay & card payments via Stripe/ 3rd party services.
- Bring partnerships with NBA teams, NBA TopShots, Chiliz and 20+ New Protocol Integration.
- Scale to global sports events beyond NBA.
- Expanding the AI-generated quiz system to cover multiple sports and leagues.
- Enhanced UI/UX for seamless user onboarding.

## Connect. Play. Win.

Be the Biggest SportsFi Dapp, combining Sports, SocialFi, NFTs, GameFi, AI, DeFi, and polymarket prediction all inside Mobile Friendly Mode.

## PitchDeck

https://www.figma.com/slides/98gzTAafUW6XPPFxN1otAW/DunkVerse---opBNB?node-id=0-1&t=NjXRFN0G7XEe5qTF-1

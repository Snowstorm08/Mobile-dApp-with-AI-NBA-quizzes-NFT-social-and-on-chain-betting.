export const ChainId = {
  
  OPBNB_TESTNET: 5611,
  
};

export const supportedChains = [
  
  ChainId.OPBNB_TESTNET,
  
];

export const getRPCProvider = (chainId: number): string => {
  switch (chainId) {
    
    case ChainId.OPBNB_TESTNET:
      return "https://opbnb-testnet-rpc.bnbchain.org";
    
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export const getExplorer = (chainId: number): string => {
  switch (chainId) {
    
    case ChainId.OPBNB_TESTNET:
      return "https://testnet.opbnbscan.com";
    
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};
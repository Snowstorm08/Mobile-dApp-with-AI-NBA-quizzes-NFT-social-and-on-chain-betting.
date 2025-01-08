export const ChainId = {
  
  //OPBNB_TESTNET: 5611,
  ANCIENT8_TESTNET: 28122024,
  
};

export const supportedChains = [
  
  //ChainId.OPBNB_TESTNET,
  ChainId.ANCIENT8_TESTNET,
  
];

export const getRPCProvider = (chainId: number): string => {
  switch (chainId) {
    
    //case ChainId.OPBNB_TESTNET:
      //return "https://opbnb-testnet-rpc.bnbchain.org";
    
    case ChainId.ANCIENT8_TESTNET:
      return "https://rpcv2-testnet.ancient8.gg";
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export const getExplorer = (chainId: number): string => {
  switch (chainId) {
    
    //case ChainId.OPBNB_TESTNET:
      //return "https://testnet.opbnbscan.com";
    case ChainId.ANCIENT8_TESTNET:
      return "https://scanv2-testnet.ancient8.gg";
      
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};
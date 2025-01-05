import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const opBNBTestnet = {
  id: 5611,
  name: 'opBNB Testnet',
  network: 'opBNBTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
    default: { http: ['https://opbnb-testnet-rpc.bnbchain.org'] },
  },
  iconUrl: 'https://chainspot.io/api/1.0/image/view?path=497/927/op_bnb1687420235160.png',
  icon: {
    url: 'https://chainspot.io/api/1.0/image/view?path=497/927/op_bnb1687420235160.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://testnet.opbnbscan.com' }
  }
};

const ancient8Testnet = {
  id: 28122024,
  name: 'Ancient8 Testnet',
  network: 'ancient8Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpcv2-testnet.ancient8.gg'] },
    default: { http: ['https://rpcv2-testnet.ancient8.gg'] },
  },
  iconUrl: 'https://blog.ancient8.gg/content/images/2023/09/A8_PFP.png',
  icon: {
    url: 'https://blog.ancient8.gg/content/images/2023/09/A8_PFP.png',
    width: 512,
    height: 512,
    format: 'png'
  },
  blockExplorers: {
    default: { url: 'https://scanv2-testnet.ancient8.gg' }
  }
};

// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [opBNBTestnet, ancient8Testnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          
          case opBNBTestnet.id:
            return { http: 'https://opbnb-testnet-rpc.bnbchain.org' };
          
          case ancient8Testnet.id:
            return { http: 'https://rpcv2-testnet.ancient8.gg' };
          default:
            return null;
        }
      },
    }),
  ]
);

// Configure wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'DunkVerse',
  projectId: '87106bd465234d097b8a51ba585bf799',
  chains,
});

// Create Wagmi configuration
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains, wagmiConfig };

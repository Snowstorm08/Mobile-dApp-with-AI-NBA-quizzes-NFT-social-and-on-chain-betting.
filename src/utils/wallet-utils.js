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


// Configure chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [opBNBTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          
          case opBNBTestnet.id:
            return { http: 'https://opbnb-testnet-rpc.bnbchain.org' };
          
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

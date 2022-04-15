import { Chain, defaultChains } from 'wagmi';

export const SIGN_IN_MESSAGE =
  'I this site to verify my meta-mask account with nonce value: ';
export const SESSION_AUTH_TOKEN_KEY = 'sessionAuthToken';

export const CUSTOM_CHAINS: Chain[] = [
  {
    blockExplorers: [
      { name: 'Etherscan', url: 'https://etherscan.io/tx/' },
      { name: 'Block Explorer', url: 'https://explorer.blockchain.com/tx/' },
    ],
    id: 1337,
    name: 'Hardhat',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['http://localhost:8545'],
    testnet: true,
  },
];

export const RINKEBY_BLOCK_EXPLORER = 'https://rinkeby.etherscan.io';

export const chains = defaultChains.concat(...CUSTOM_CHAINS);

export const SUBGRAPH_ENDPOINT_URL =
  process.env.NEXT_PUBLIC_SUBGRAPH_ENDPOINT_URL ||
  'https://api.studio.thegraph.com/query/25568/dumbtodo/v0.0.2';

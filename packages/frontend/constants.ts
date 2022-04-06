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

export const chains = defaultChains.concat(...CUSTOM_CHAINS);
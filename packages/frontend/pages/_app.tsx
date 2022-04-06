import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { providers } from 'ethers';
import { Provider, chain, Connector } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';

import { chains } from '../constants';

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
// console.log({ infuraId });

const defaultChain = chain.mainnet;

type ConnectorsConfig = { chainId?: number };

const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: {
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: 'Dumb Web3 app',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

const customProviders = [
  {
    chainId: 1337,
    provider: new providers.JsonRpcProvider('http://localhost:8545'),
  },
];

const localProvider = new providers.JsonRpcProvider('http://localhost:8545');
const provider = ({ chainId }: ProviderConfig) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      infura: infuraId,
    }
  );
// console.log('provider:: ', provider);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={() => localProvider}
    >
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

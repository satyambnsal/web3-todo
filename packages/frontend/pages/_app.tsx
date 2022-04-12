import type { AppProps } from 'next/app';
import { providers } from 'ethers';
import { Provider, chain, Connector } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WalletLinkConnector } from 'wagmi/connectors/walletLink';
import '../styles/globals.css';

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
        appName: 'Web3 Todo',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

const provider = ({ chainId }: ProviderConfig) => {
  console.log('Chain Id:: ', chainId);
  if (chainId === 1337) {
    return new providers.JsonRpcProvider('http://localhost:8545');
  }

  return providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      infura: infuraId,
    }
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect connectors={connectors} provider={provider}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

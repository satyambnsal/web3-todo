import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { ConnectWalletModal } from '../components/ConnectWalletModal';
// import { Todos } from '../components/Todos';
import { SubgraphTodos } from '../components/SubgraphTodos';
import { Toaster } from 'react-hot-toast';

const Home: NextPage = () => {
  const [{ data: accountData }] = useAccount();
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const isAddress = !!accountData?.address || false;

  const handleOpenWalletModal = () => setShowConnectWallet(true);

  const handleClose = () => setShowConnectWallet(false);

  return (
    <div className="">
      <Head>
        <title>Web3 Todo🙅‍♂️ 🙅‍♂️</title>
        <meta name="description" content="Web3 Todo Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen w-full">
        <header>
          <div className="absolute top-5 right-5">
            {!!isAddress ? (
              <button className="btn" disabled={true} onClick={() => {}}>
                {accountData?.address}
              </button>
            ) : (
              <button onClick={handleOpenWalletModal}>Connect Wallet</button>
            )}
          </div>
        </header>
        <SubgraphTodos
          handleOpenWalletModal={handleOpenWalletModal}
        ></SubgraphTodos>
        <ConnectWalletModal
          isOpen={showConnectWallet}
          handleClose={handleClose}
        ></ConnectWalletModal>
        <Toaster />
      </main>
    </div>
  );
};

export default Home;

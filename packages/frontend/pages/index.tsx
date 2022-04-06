import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { Account } from '../components/Account';

import { Connect } from '../components/Connect';
import { NetworkSwitcher } from '../components/NetworkSwitcher';
import { Todos } from '../components/Todos';
import { SignMessage } from '../components/SignMessage';

const Home: NextPage = () => {
  const [{ data: accountData }] = useAccount();
  const isAddress = !!accountData?.address || false;
  return (
    <div className="">
      <Head>
        <title>Web3 Todo🙅‍♂️ 🙅‍♂️</title>
        <meta name="description" content="Web3 Todo Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="hero min-h-screen bg-base-200">
        <header>
          <div className="absolute top-5 right-5">
            {!!isAddress ? (
              <button className="btn" disabled={true} onClick={() => {}}>
                {accountData?.address}
              </button>
            ) : (
              <Connect></Connect>
            )}
          </div>
        </header>
        {/* <Account></Account>
            <NetworkSwitcher></NetworkSwitcher> */}
        <Todos></Todos>
        {/* <SignMessage></SignMessage> */})
      </main>
    </div>
  );
};

export default Home;

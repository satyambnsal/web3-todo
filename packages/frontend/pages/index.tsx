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
  return (
    <div className="">
      <Head>
        <title>Web3 Todo🙅‍♂️ 🙅‍♂️</title>
        <meta name="description" content="Web3 Todo Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center mt-10">
        <header>
          <button className="btn">Button</button>
        </header>
        {accountData?.address ? (
          <>
            <Account></Account>
            <NetworkSwitcher></NetworkSwitcher>
            <Todos></Todos>
            <SignMessage></SignMessage>
          </>
        ) : (
          <Connect />
        )}
      </main>
    </div>
  );
};

export default Home;

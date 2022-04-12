import * as React from 'react';
import { useConnect } from 'wagmi';
import { useIsMounted } from '../hooks/useIsMounted';
import { Modal } from './Modal';

{
  /* <div>{error && <div>{error?.message ?? 'Failed to connect'}</div>}</div> */
}

type ConnectWalletModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const ConnectWalletModal = ({
  isOpen,
  handleClose,
}: ConnectWalletModalProps) => {
  const isMounted = useIsMounted();
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect();

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <ul className="p-2 shadow bg-base-100 rounded-box w-52">
        {connectors.map((x, i) => (
          <li key={i}>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isMounted && !x.ready}
              key={x.name}
              onClick={() => connect(x)}
            >
              {x.id === 'injected' ? (isMounted ? x.name : x.id) : x.name}
              {isMounted && !x.ready && ' (unsupported)'}
              {loading && x.name === connector?.name && ' (connecting...)'}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

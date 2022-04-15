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
      <ul className="mt-6 p-8 ">
        {connectors.map((x, i) => (
          <li key={i} className="block my-2 mx-auto">
            <button
              type="button"
              className="w-full mx-auto btn font-bold py-2 px-4 rounded"
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

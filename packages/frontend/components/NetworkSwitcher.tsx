import * as React from 'wagmi';
import { useNetwork } from 'wagmi';
import { chains } from '../constants';

export const NetworkSwitcher = () => {
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();

  return (
    <div>
      <div>
        Connected to {networkData.chain?.name ?? networkData.chain?.id}{' '}
        {networkData.chain?.unsupported && '(unsupported)'}
      </div>

      {switchNetwork &&
        chains.map((x) =>
          x.id === networkData.chain?.id ? null : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              key={x.id}
              onClick={() => switchNetwork(x.id)}
            >
              Switch to {x.name}
            </button>
          )
        )}

      {switchNetworkError && switchNetworkError?.message}
    </div>
  );
};

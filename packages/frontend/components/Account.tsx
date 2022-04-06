import * as React from 'react';
import { useAccount } from 'wagmi';

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  if (!accountData) return <div>No account connected</div>;

  return (
    <div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => disconnect()}
        >
          Disconnect from {accountData?.connector?.name}
        </button>
      </div>

      <div>
        {accountData?.ens?.name ?? accountData?.address}
        {accountData?.ens ? `(${accountData?.address})` : null}
      </div>
    </div>
  );
};

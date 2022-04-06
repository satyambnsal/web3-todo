import * as React from 'react';
import { useConnect } from 'wagmi';

import { useIsMounted } from '../hooks/useIsMounted';

{
  /* <div>{error && <div>{error?.message ?? 'Failed to connect'}</div>}</div> */
}
export const Connect = () => {
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
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1">
        Connect Wallet
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
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
    </div>
  );
};

import { FC } from 'react';
import { useConnect } from 'wagmi';

export const Example: FC = () => {
  const [{ data, error }, connect] = useConnect();
  console.log(data.connectors);
  return (
    <div>
      {data.connectors.map((connector) => (
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </button>
      ))}
      {error && <div>{error?.message ?? 'Failed to connect'}</div>}
    </div>
  );
};

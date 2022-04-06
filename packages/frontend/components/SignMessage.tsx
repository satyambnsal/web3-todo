import { verifyMessage } from 'ethers/lib/utils';
import { useSignMessage } from 'wagmi';
import { useRef, useState, useMemo, FormEvent } from 'react';

export const SignMessage = () => {
  const previousMessage = useRef<string>('');
  const [message, setMessage] = useState('');
  const [{ data, error, loading }, signMessage] = useSignMessage();

  console.log('data:: ', data);
  const recoveredAddress = useMemo(() => {
    if (!data || previousMessage.current) return undefined;
    return verifyMessage(previousMessage.current, data);
  }, [data, previousMessage]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('handleSubmit:: ', e);
    e.preventDefault();
    previousMessage.current = message;
    signMessage({ message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Message"> Enter a message to sign</label>
      <textarea
        name="message"
        id="message"
        cols={30}
        rows={4}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
      ></textarea>
      <button
        type="submit"
        className="btn btn--primary"
        disabled={loading || !message.length}
      >
        {loading ? 'Check wallet' : 'Sign Message'}
      </button>
      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress}</div>
          <div>Signature: {data}</div>
        </div>
      )}
      {error && <div>{error?.message ?? 'Error signing message'}</div>}
    </form>
  );
};

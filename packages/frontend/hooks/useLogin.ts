import { useLocalStorage } from 'react-use';
import { SESSION_AUTH_TOKEN_KEY } from '../constants';

export default function useLogin() {
  const [value, _, remove] = useLocalStorage(SESSION_AUTH_TOKEN_KEY);

  if (value) {
    return {
      isLoggedIn: true,
      token: value,
      logout: () => remove(),
    };
  }

  return {
    isLoggedIn: false,
    token: null,
    logout: () => remove(),
  };
}

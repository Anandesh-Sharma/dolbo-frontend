import { atom, selector } from 'recoil';

interface AuthToken {
  access_token: string;
  token_type: string;
  expires_at: string;
}

export const authTokenState = atom<AuthToken | null>({
  key: 'authTokenState',
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      // Initialize from localStorage
      const savedToken = localStorage.getItem('auth_token');
      if (savedToken) {
        const token = JSON.parse(savedToken) as AuthToken;
        // Check if token is expired
        if (new Date(token.expires_at) > new Date()) {
          setSelf(token);
        } else {
          localStorage.removeItem('auth_token');
        }
      }

      // Save to localStorage on change
      onSet((newValue, _, isReset) => {
        if (isReset || newValue === null) {
          localStorage.removeItem('auth_token');
        } else {
          localStorage.setItem('auth_token', JSON.stringify(newValue));
        }
      });
    },
  ],
});

export const isAuthenticatedState = selector({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const token = get(authTokenState);
    if (!token) return false;
    return new Date(token.expires_at) > new Date();
  },
}); 
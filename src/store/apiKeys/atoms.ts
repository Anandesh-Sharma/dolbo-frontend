import { atom } from 'recoil';
import { APIKey } from '../../types/apiKeys';

// Cache API keys by team ID
export const apiKeysCacheState = atom<Record<string, APIKey[]>>({
  key: 'apiKeysCacheState',
  default: {},
});

export const apiKeysLoadingState = atom<boolean>({
  key: 'apiKeysLoadingState',
  default: false,
});

export const apiKeysErrorState = atom<string | null>({
  key: 'apiKeysErrorState',
  default: null,
});
import { selector } from 'recoil';
import { apiKeysCacheState } from './atoms';
import { selectedTeamIdState } from '../teams/atoms';

export const apiKeysState = selector({
  key: 'apiKeysState',
  get: ({ get }) => {
    const selectedTeamId = get(selectedTeamIdState);
    const cache = get(apiKeysCacheState);
    return selectedTeamId ? cache[selectedTeamId] || [] : [];
  },
});

export const activeApiKeysState = selector({
  key: 'activeApiKeysState',
  get: ({ get }) => {
    const apiKeys = get(apiKeysState);
    return apiKeys.filter((key) => key.status === 'ACTIVE');
  },
});
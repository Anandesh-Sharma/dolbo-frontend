import { atom } from 'recoil';
import { Team } from '../../types/teams';

export const teamsState = atom<Team[]>({
  key: 'teamsState',
  default: [],
});

export const selectedTeamIdState = atom<string>({
  key: 'selectedTeamIdState',
  default: '',
});

export const teamsLoadingState = atom<boolean>({
  key: 'teamsLoadingState',
  default: true,
});

export const teamsInitializedState = atom<boolean>({
  key: 'teamsInitializedState',
  default: false,
});

export const teamsErrorState = atom<string | null>({
  key: 'teamsErrorState',
  default: null,
});
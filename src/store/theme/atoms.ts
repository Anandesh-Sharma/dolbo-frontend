import { atom } from 'recoil';

export type Theme = 'dark' | 'light';

export const themeState = atom<Theme>({
  key: 'themeState',
  default: 'dark',
}); 
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { themeState } from '../store/theme/atoms';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    // Remove both classes first
    document.documentElement.classList.remove('light', 'dark');
    // Add the current theme class
    document.documentElement.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
} 
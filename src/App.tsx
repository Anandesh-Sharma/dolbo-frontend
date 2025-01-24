import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AuthProvider from './auth/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import AppInitializer from './AppInitializer';

export default function App() {
  return (
    <ErrorBoundary>
      <RecoilRoot>
        <Router>
          <AuthProvider>
            <AppInitializer />
          </AuthProvider>
        </Router>
      </RecoilRoot>
    </ErrorBoundary>
  );
}
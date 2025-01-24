import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useAuth0 } from '@auth0/auth0-react';
import AuthProvider from './auth/AuthProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Footer from './components/Footer';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import AuthLayout from './components/auth/AuthLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import APIKeys from './pages/dashboard/APIKeys';
import FaceRecognition from './pages/dashboard/FaceRecognition';
import FaceAnalysis from './pages/dashboard/FaceAnalysis';
import ObjectDetection from './pages/dashboard/ObjectDetection';
import OCR from './pages/dashboard/OCR';
import IDVerification from './pages/dashboard/IDVerification';
import Billing from './pages/dashboard/Billing';
import Team from './pages/dashboard/Team';
import Help from './pages/dashboard/Help';
import APIReference from './pages/dashboard/APIReference';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import AppLoader from './components/AppLoader';
import ErrorBoundary from './components/ErrorBoundary';
import { 
  teamsState, 
  selectedTeamIdState, 
  teamsLoadingState, 
  teamsInitializedState 
} from './store/teams';
import { getAPIUrl } from './utils/api';
import { API_TOKEN } from './envs';
import ImageEnhancement from './pages/dashboard/ImageEnhancement';

function AppInitializer() {
  const setTeams = useSetRecoilState(teamsState);
  const setSelectedTeamId = useSetRecoilState(selectedTeamIdState);
  const setIsLoading = useSetRecoilState(teamsLoadingState);
  const setIsInitialized = useSetRecoilState(teamsInitializedState);

  useEffect(() => {
    async function initializeTeams() {
      try {
        const response = await fetch(getAPIUrl('/teams/list'), {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            accept: 'application/json',
            "ngrok-skip-browser-warning": "69420"
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
        setTeams(data);
        
        if (data.length > 0) {
          setSelectedTeamId(data[0].id);
        }
      } catch (error) {
        console.error('Error initializing teams:', error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    }

    initializeTeams();
  }, [setTeams, setSelectedTeamId, setIsLoading, setIsInitialized]);

  return <AppRoutes />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Hero />
            <Features />
            <Services />
            <Footer />
          </div>
        }
      />
      <Route
        path="/signin"
        element={
          <AuthLayout
            title="Welcome back"
            subtitle="Sign in to your account to continue"
          >
            <SignInForm />
          </AuthLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <AuthLayout
            title="Create an account"
            subtitle="Start your 14-day free trial"
          >
            <SignUpForm />
          </AuthLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AppLoader>
            <DashboardLayout />
          </AppLoader>
        }
      >
        <Route index element={<Overview />} />
        <Route path="api-keys" element={<APIKeys />} />
        <Route path="face-recognition" element={<FaceRecognition />} />
        <Route path="face-analysis" element={<FaceAnalysis />} />
        <Route path="object-detection" element={<ObjectDetection />} />
        <Route path="ocr" element={<OCR />} />
        <Route path="id-verification" element={<IDVerification />} />
        <Route path="billing" element={<Billing />} />
        <Route path="team" element={<Team />} />
        <Route path="help" element={<Help />} />
        <Route path="api-reference" element={<APIReference />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="image-enhancement" element={<ImageEnhancement />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

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
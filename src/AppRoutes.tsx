import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'nprogress/nprogress.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Footer from './components/Footer';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import SignupSuccess from './pages/auth/SignupSuccess';
import AuthLayout from './components/auth/AuthLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import SuspenseProgress from './components/SuspenseProgress';
import AuthGuard from './components/auth/AuthGuard';
import { useAuth } from './hooks/useAuth';

// Lazy load all dashboard pages
const Overview = React.lazy(() => import('./pages/dashboard/Overview'));
const APIKeys = React.lazy(() => import('./pages/APIKeys'));
const FaceRecognition = React.lazy(() => import('./pages/FaceRecognition'));
const FaceAnalysis = React.lazy(() => import('./pages/FaceAnalysis'));
// const ImageEnhancement = React.lazy(() => import('./pages/ImageEnhancement'));
// const ObjectDetection = React.lazy(() => import('./pages/ObjectDetection'));
const OCR = React.lazy(() => import('./pages/OCR'));
const IDVerification = React.lazy(() => import('./pages/IDVerification'));
const Billing = React.lazy(() => import('./pages/Billing'));
const Team = React.lazy(() => import('./pages/Team'));
// const Help = React.lazy(() => import('./pages/Help'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const APIReference = React.lazy(() => import('./pages/APIReference'));

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <>
              <Navbar />
              <Hero />
              <Features />
              <Services />
              <Footer />
            </>
          )
        }
      />

      {/* Auth routes */}
      <Route
        path="/signin"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthLayout title="Welcome back" subtitle="Sign in to your account">
              <SignInForm />
            </AuthLayout>
          )
        }
      />

      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <AuthLayout title="Create an account" subtitle="Start your free trial">
              <SignUpForm />
            </AuthLayout>
          )
        }
      />

      <Route
        path="/signup/success"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <SignupSuccess />
          )
        }
      />

      <Route
        path="api-reference"
        element={
          <SuspenseProgress>
            <APIReference />
          </SuspenseProgress>
        }
      />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route
          index
          element={
            <SuspenseProgress>
              <Overview />
            </SuspenseProgress>
          }
        />
        <Route
          path="api-keys"
          element={
            <SuspenseProgress>
              <APIKeys />
            </SuspenseProgress>
          }
        />
        <Route
          path="face-recognition"
          element={
            <SuspenseProgress>
              <FaceRecognition />
            </SuspenseProgress>
          }
        />
        <Route
          path="face-analysis"
          element={
            <SuspenseProgress>
              <FaceAnalysis />
            </SuspenseProgress>
          }
        />
        {/* <Route
          path="image-enhancement"
          element={
            <SuspenseProgress>
              <ImageEnhancement />
            </SuspenseProgress>
          }
        />
        <Route
          path="object-detection"
          element={
            <SuspenseProgress>
              <ObjectDetection />
            </SuspenseProgress>
          }
        /> */}
        <Route
          path="ocr"
          element={
            <SuspenseProgress>
              <OCR />
            </SuspenseProgress>
          }
        />
        <Route
          path="id-verification"
          element={
            <SuspenseProgress>
              <IDVerification />
            </SuspenseProgress>
          }
        />
        <Route
          path="billing"
          element={
            <SuspenseProgress>
              <Billing />
            </SuspenseProgress>
          }
        />
        <Route
          path="team"
          element={
            <SuspenseProgress>
              <Team />
            </SuspenseProgress>
          }
        />
        {/* <Route
          path="help"
          element={
            <SuspenseProgress>
              <Help />
            </SuspenseProgress>
          }
        /> */}
        <Route
          path="profile"
          element={
            <SuspenseProgress>
              <Profile />
            </SuspenseProgress>
          }
        />
        <Route
          path="settings"
          element={
            <SuspenseProgress>
              <Settings />
            </SuspenseProgress>
          }
        />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 
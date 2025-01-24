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
import AuthLayout from './components/auth/AuthLayout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AppLoader from './components/AppLoader';
import SuspenseProgress from './components/SuspenseProgress';

// Lazy load all dashboard pages
const Overview = React.lazy(() => import('./pages/dashboard/Overview'));
const APIKeys = React.lazy(() => import('./pages/APIKeys'));
const FaceRecognition = React.lazy(() => import('./pages/FaceRecognition'));
const FaceAnalysis = React.lazy(() => import('./pages/FaceAnalysis'));
const ImageEnhancement = React.lazy(() => import('./pages/ImageEnhancement'));
const ObjectDetection = React.lazy(() => import('./pages/ObjectDetection'));
const OCR = React.lazy(() => import('./pages/OCR'));
const IDVerification = React.lazy(() => import('./pages/IDVerification'));
const Billing = React.lazy(() => import('./pages/Billing'));
const Team = React.lazy(() => import('./pages/Team'));
const Help = React.lazy(() => import('./pages/Help'));
const APIReference = React.lazy(() => import('./pages/APIReference'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));

export default function AppRoutes() {
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
        <Route
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
        />
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
        <Route
          path="help"
          element={
            <SuspenseProgress>
              <Help />
            </SuspenseProgress>
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 
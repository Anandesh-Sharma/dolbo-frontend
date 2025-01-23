import React from 'react';
import { Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function SignInForm() {
  const { loginWithRedirect } = useAuth0();

  const handleEmailLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signin',
      }
    });
  };

  const handleGithubLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'github'
      }
    });
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-gray-800/50 py-8 px-4 shadow-xl ring-1 ring-white/10 backdrop-blur-lg sm:rounded-lg sm:px-10">
        <div className="space-y-6">
          <button
            onClick={handleEmailLogin}
            className="w-full flex justify-center items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
          >
            <Mail className="h-5 w-5" />
            Sign in with Email
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800/50 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGithubLogin}
            className="w-full flex justify-center items-center gap-2 rounded-md bg-gray-700/50 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
          >
            <Github className="h-5 w-5" />
            GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
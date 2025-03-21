import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';

export default function SignupSuccess() {
  return (
    <AuthLayout 
      title="Registration Successful!" 
      subtitle="Your account has been created successfully"
    >
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800/50 py-8 px-4 shadow-xl ring-1 ring-white/10 backdrop-blur-lg sm:rounded-lg sm:px-10">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-medium text-white">
                Welcome to Dolbo!
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Your account has been created successfully. You can now sign in to access your account.
              </p>
            </div>

            <Link
              to="/signin"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
} 
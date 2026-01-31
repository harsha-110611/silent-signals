import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import LoginForm from './components/LoginForm';
import AuthProviderButton from './components/AuthProviderButton';
import AuthDivider from './components/AuthDivider';
import PrivacyNotice from './components/PrivacyNotice';

const AuthenticationLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [providerLoading, setProviderLoading] = useState(null);
  const [authError, setAuthError] = useState('');

  const mockCredentials = {
    student: { email: 'student@university.edu', password: 'student123' },
    parent: { email: 'parent@university.edu', password: 'parent123' },
    mentor: { email: 'mentor@university.edu', password: 'mentor123' }
  };

  const handleEmailLogin = (formData) => {
    setLoading(true);
    setAuthError('');

    setTimeout(() => {
      const validCredentials = mockCredentials?.[formData?.role];
      
      if (
        formData?.email === validCredentials?.email &&
        formData?.password === validCredentials?.password
      ) {
        const dashboardRoutes = {
          student: '/student-dashboard',
          parent: '/parent-dashboard',
          mentor: '/mentor-dashboard'
        };
        navigate(dashboardRoutes?.[formData?.role]);
      } else {
        setAuthError(`Invalid credentials. Please use:\nEmail: ${validCredentials?.email}\nPassword: ${validCredentials?.password}`);
      }
      setLoading(false);
    }, 1500);
  };

  const handleProviderLogin = (provider, role = 'student') => {
    setProviderLoading(provider);
    setAuthError('');

    setTimeout(() => {
      const dashboardRoutes = {
        student: '/student-dashboard',
        parent: '/parent-dashboard',
        mentor: '/mentor-dashboard'
      };
      navigate(dashboardRoutes?.[role]);
      setProviderLoading(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl md:rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl mb-4">
                <Icon name="Radio" size={32} color="var(--color-primary)" />
              </div>
              <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2">
                Welcome to Silent Signals
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Sign in to access your academic monitoring dashboard
              </p>
            </div>

            {authError && (
              <div className="mb-4 md:mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex gap-3">
                  <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="caption font-medium text-destructive mb-1">Authentication Failed</p>
                    <p className="text-xs text-destructive/80 whitespace-pre-line">{authError}</p>
                  </div>
                </div>
              </div>
            )}

            <LoginForm onSubmit={handleEmailLogin} loading={loading} />

            <AuthDivider text="OR CONTINUE WITH" />

            <div className="space-y-3">
              <AuthProviderButton
                provider="google"
                onClick={() => handleProviderLogin('google')}
                loading={providerLoading === 'google'}
                disabled={loading || providerLoading !== null}
              />
              <AuthProviderButton
                provider="github"
                onClick={() => handleProviderLogin('github')}
                loading={providerLoading === 'github'}
                disabled={loading || providerLoading !== null}
              />
            </div>

            <PrivacyNotice />

            <div className="mt-6 text-center">
              <p className="caption text-muted-foreground">
                Don't have an account?{' '}
                <button className="text-primary hover:text-primary/80 font-medium transition-smooth focus-ring rounded px-1">
                  Contact your institution
                </button>
              </p>
            </div>
          </div>

          <div className="bg-muted/30 px-6 py-4 md:px-8 md:py-5 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Icon name="Lock" size={14} />
              <span>Secured by Firebase Authentication</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Silent Signals. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLogin;
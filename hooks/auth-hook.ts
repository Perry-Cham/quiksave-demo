'use client';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';

export interface AuthError {
  code: string;
  message: string;
}

interface UseAuthReturn {
  isLoading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/admin',
        rememberMe: false,
      });

      if (authError) {
        setError({
          code: 'AUTH_FAILED',
          message: authError.message || 'Sign in failed. Please check your credentials.',
        });
      }
    } catch (err: any) {
      setError({
        code: 'NETWORK_ERROR',
        message: err.message || 'Network error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/admin',
      });

      if (authError) {
        setError({
          code: 'SIGNUP_FAILED',
          message: authError.message || 'Sign up failed. Please try again.',
        });
      }
    } catch (err: any) {
      setError({
        code: 'NETWORK_ERROR',
        message: err.message || 'Network error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    signIn,
    signUp,
    clearError: () => setError(null),
  };
}
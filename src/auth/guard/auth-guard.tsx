'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';

import useAuthStore from 'src/store/AuthStore';
import { useUserStore } from 'src/store/UserStore';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { loading } = useAuthContext();

  const { isAuthenticated: authenticated } = useAuthStore();

  const { fetchUser } = useUserStore();
  const [isChecking, setIsChecking] = useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    try {
      await fetchUser();
      setIsChecking(false);
    } catch (error) {
      router.replace('/auth/login');
    }
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}

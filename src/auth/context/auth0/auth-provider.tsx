'use client';

import type { AppState } from '@auth0/auth0-react';

import { useAuth0, Auth0Provider } from '@auth0/auth0-react';
import { useMemo, useState, useEffect, useCallback } from 'react';

import axios from 'src/utils/axios';

import { CONFIG } from 'src/config-global';
import useAuthStore from 'src/store/AuthStore';
import { KeysLocalStorage } from 'src/store/localStorage';

import { AuthContext } from '../auth-context';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { domain, clientId, callbackUrl } = CONFIG.auth0;

  const onRedirectCallback = useCallback((appState?: AppState) => {
    window.location.replace(appState?.returnTo || window.location.pathname);
  }, []);

  if (!(domain && clientId && callbackUrl)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: callbackUrl, audience: 'michin-api' }}
      onRedirectCallback={onRedirectCallback}
    >
      <AuthProviderContainer>{children}</AuthProviderContainer>
    </Auth0Provider>
  );
}

// ----------------------------------------------------------------------

function AuthProviderContainer({ children }: Props) {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { isAuthenticated: isAuthenticatedStore } = useAuthStore();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getAccessToken = useCallback(async () => {
    try {
      if (isAuthenticated || isAuthenticatedStore) {
        let token = '';

        if (isAuthenticated) {
          token = await getAccessTokenSilently();
        } else {
          token = localStorage.getItem(KeysLocalStorage.keyAccessToken) || '';
        }

        setAccessToken(token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      } else {
        setAccessToken(null);
        delete axios.defaults.headers.common.Authorization;
      }
    } catch (error) {
      console.error(error);
    }
  }, [getAccessTokenSilently, isAuthenticated, isAuthenticatedStore]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = isAuthenticated ? 'authenticated' : 'unauthenticated';

  const status = isLoading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: user
        ? {
            ...user,
            id: user?.sub,
            accessToken,
            displayName: user?.name,
            photoURL: user?.picture,
            role: user?.role ?? 'admin',
          }
        : null,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [accessToken, status, user]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

'use client';

import { useEffect } from 'react';

import { handleSignOut } from '@/api/authAPI';
import { ALERT_MSG } from '@/constants/commonConstants';
import { useGrantIdQuery } from '@/hooks/queries/useGrantIdQuery';
import { useTokensQuery } from '@/hooks/queries/useTokensQuery';
import { useUserInfoQuery } from '@/hooks/queries/useUserInfoQuery';
import { useAuthStore } from '@/state/store/authStore';

const AuthChecker = () => {
  const {
    data: userInfoData,
    isSuccess: useUserInfoSuccessed,
    refetch: userInfoQueryRefetch,
    isRefetching: isUserInfoRefetching,
  } = useUserInfoQuery();
  const {
    data: tokenData,
    isSuccess: useTokensSuccessed,
    refetch: tokensQueryRefetch,
    isRefetching: isTokensRefetching,
  } = useTokensQuery();
  const {
    data: grantIdData,
    isSuccess: useGrantIdSuccessed,
    refetch: grantIdQueryRefetch,
  } = useGrantIdQuery();

  const { auth, setAuth } = useAuthStore();

  console.log('useUserInfoQuery >> ', userInfoData, useUserInfoSuccessed);
  console.log('useTokensQuery >> ', tokenData, useTokensSuccessed);
  console.log('useGrantIdQuery >> ', grantIdData, useGrantIdSuccessed);
  console.log('useAuthStore >> ', auth);
  console.log('===== AuthChecker RENDER =====');

  useEffect(() => {
    if (!auth.isAuth) userInfoQueryRefetch();
  }, [auth.isAuth]);

  useEffect(() => {
    if (useUserInfoSuccessed) {
      console.log('CALL useUserInfoQuery');
      switch (userInfoData.status) {
        case 200:
          setAuth({
            isAuth: true,
            username: userInfoData.data.username,
            isLoading: false,
          });
          break;
        case 401:
          tokensQueryRefetch();
          break;
        case 422:
          if (window.confirm(ALERT_MSG.auth.invalidSession)) handleSignOut();
        default:
          break;
      }
    }
  }, [useUserInfoSuccessed, isUserInfoRefetching]);

  useEffect(() => {
    if (useTokensSuccessed) {
      console.log('CALL useTokensQuery');
      switch (tokenData.status) {
        case 200:
          console.log('getTokensByGrantId SUCCESS');
          userInfoQueryRefetch();
          break;
        case 401:
          grantIdQueryRefetch();
          break;
        case 403:
        case 422:
          if (window.confirm(ALERT_MSG.auth.invalidSession)) handleSignOut();
          break;
        default:
          break;
      }
    }
  }, [useTokensSuccessed, isTokensRefetching]);

  useEffect(() => {
    if (useGrantIdSuccessed) {
      console.log('CALL useGrantIdQuery');
      switch (grantIdData.status) {
        case 200:
          console.log('getGrantId SUCCESS');
          tokensQueryRefetch();
          break;
        case 401:
          setAuth({
            isAuth: false,
            username: '',
            isLoading: false,
          });
          if (grantIdData.data.isSessionExist) {
            if (window.confirm(ALERT_MSG.auth.invalidSession)) handleSignOut();
          }
          break;
        case 422:
          if (window.confirm(ALERT_MSG.auth.invalidSession)) handleSignOut();
          break;
        default:
          break;
      }
    }
  }, [useGrantIdSuccessed]);

  return <></>;
};

export default AuthChecker;

'use client';
import { type UseMutateFunction, type UseMutateAsyncFunction } from '@tanstack/react-query';
import { createContext, useEffect } from 'react';

import { useGetUserInfo } from '@/api/getUserInfo';
import { usePostLogin } from '@/api/postLogIn';
import { type TResCheckUser, type TLoginReqDTO } from '@/typings/auth';

export const AuthCTX = createContext<{
  user?: TResCheckUser | undefined;
  logIn?: UseMutateFunction<void, Error, TLoginReqDTO, unknown>;
  logInAsync?: UseMutateAsyncFunction<void, Error, TLoginReqDTO, unknown>;
  isLoading: boolean;
}>({ user: undefined, isLoading: false });

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading: isLoadingUserInfo } = useGetUserInfo();
  const { mutate, mutateAsync, isPending: isLoginProgression } = usePostLogin();
  useEffect(() => {
    console.log({ mutateAsync });
  }, [mutateAsync]);

  return (
    <AuthCTX.Provider
      value={{
        user: data,
        isLoading: isLoadingUserInfo || isLoginProgression,
        logIn: mutate,
        logInAsync: mutateAsync,
      }}
    >
      {children}
    </AuthCTX.Provider>
  );
};

export default AuthProvider;

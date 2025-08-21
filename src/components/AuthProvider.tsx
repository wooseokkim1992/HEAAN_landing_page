'use client';
import { type UseMutateFunction, type UseMutateAsyncFunction } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import { createContext, useEffect } from 'react';

import { useDeleteUser } from '@/api/deleteUserInfo';
import { useGetUserInfo } from '@/api/getUserInfo';
import { usePostLogin } from '@/api/postLogIn';
import { type TResCheckUser, type TLoginReqDTO, type TNormalRespDTO } from '@/typings/auth';

export const AuthCTX = createContext<{
  user?: TResCheckUser | undefined;
  logIn?: UseMutateFunction<void, Error, TLoginReqDTO, unknown>;
  logInAsync?: UseMutateAsyncFunction<void, Error, TLoginReqDTO, unknown>;
  logOut?: UseMutateFunction<AxiosResponse<TNormalRespDTO, undefined>, Error, void, unknown>;
  logOutAsync?: UseMutateAsyncFunction<
    AxiosResponse<TNormalRespDTO, undefined>,
    Error,
    void,
    unknown
  >;
  isLoading: boolean;
}>({ user: undefined, isLoading: false });

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading: isLoadingUserInfo } = useGetUserInfo();
  const { mutate, mutateAsync, isPending: isLoginProgressing } = usePostLogin();
  const {
    mutate: mutateDeleteUser,
    mutateAsync: mutateDeleteUserAsync,
    isPending: isLogOutProgressing,
  } = useDeleteUser();
  useEffect(() => {
    console.log({ data });
  }, [data]);

  return (
    <AuthCTX.Provider
      value={{
        user: data,
        isLoading: isLoadingUserInfo || isLoginProgressing || isLogOutProgressing,
        logIn: mutate,
        logInAsync: mutateAsync,
        logOut: mutateDeleteUser,
        logOutAsync: mutateDeleteUserAsync,
      }}
    >
      {children}
    </AuthCTX.Provider>
  );
};

export default AuthProvider;

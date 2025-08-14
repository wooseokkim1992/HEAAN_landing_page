import { create } from 'zustand';

type AuthStoreType = {
  isAuth: boolean;
  username: string;
  isLoading: boolean;
};

interface UseAuthStoreProps {
  auth: AuthStoreType;
  setAuth: (target: AuthStoreType) => void;
}

export const useAuthStore = create<UseAuthStoreProps>()((set) => ({
  auth: {
    // isAuth: true,
    // username: "geuna0204@cryptolab.co.kr",
    // isLoading: false,
    isAuth: false,
    username: '',
    isLoading: true,
  },
  setAuth: (target: AuthStoreType) => set((state) => ({ ...state, auth: target })),
}));

export type TResCheckUser = {
  message: string;
  data: {
    email: string;
    heaan_status: string;
    coder_status: string;
  };
};

export type TInfo = {
  h_sid?: string;
  coder_session_token?: string;
};
export type TExpDate = {
  tokenExp?: string;
  maxAge?: number;
};
export type TLoginReqDTO = {
  email: string;
  password: string;
};

export type TNormalRespDTO = {
  message: string;
};

export type TAuthContext<TUser, TLoginReqDTO> = {
  user: TUser | null;
  signIn?: ({ loginData }: { loginData: TLoginReqDTO }) => Promise<unknown>;
  signOut?: () => Promise<void>;
  status: 'loading' | 'authenticated' | 'unauthenticated';
};

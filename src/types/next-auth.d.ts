import { type User as DefaultUser } from 'node_modules/next-auth/core/types';

import { type TResCheckUser, type TInfo } from '@typings/auth';
import { type FetchError } from '@typings/errors/fetchError';

declare module 'next-auth' {
  interface User extends Omit<DefaultUser, 'id'> {
    data: TResCheckUser['data'];
    info: TInfo;
  }
  interface Session {
    user?: TResCheckUser['data'];
    errorInfo?: FetchError;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: TResCheckUserp['data'];
    info: TInfo;
    errorInfo?: FetchError;
  }
}

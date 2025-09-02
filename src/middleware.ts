import { type MiddlewareConfig } from 'next/server';

import { middlewareChain } from '@middlewares/middlewareChain';
import { newNextAuthMiddleware } from '@middlewares/NextAuthMiddleware';
import { routeMiddleware } from '@middlewares/routeMiddleware';

export const middleware = middlewareChain([routeMiddleware, newNextAuthMiddleware]);

export const config: MiddlewareConfig = {
  matcher: [
    '/sign-in',
    '/reset-password',
    '/confirm-account',
    '/payments/:path*',
    '/my/:path*',
    '/workspace',
    '/widget/:path*',
  ],
};

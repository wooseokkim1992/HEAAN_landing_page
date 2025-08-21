import { NextResponse } from 'next/server';
import { type MiddlewareConfig, type NextFetchEvent, type NextRequest } from 'next/server';

import { type CustomMiddleware } from './middlewareChain';

export const AuthMiddleware = (middleware: CustomMiddleware) => {
  return (req: NextRequest, evt: NextFetchEvent, resp: NextResponse) => {
    const cookies = req.cookies;
    const h_sid = cookies.get('h_sid');
    const coder_session_token = cookies.get('coder_session_token');
    if (!Boolean(h_sid) || !Boolean(coder_session_token)) {
      const { sourcePage } = evt;
      console.log({ sourcePage });
      return NextResponse.redirect('/', { status: 403 });
    }
    return middleware(req, evt, resp);
  };
};

export const config: MiddlewareConfig = {
  matcher: ['/payments/:path*', '/my/:path*', '/workspace', '/widget/:path*'],
};

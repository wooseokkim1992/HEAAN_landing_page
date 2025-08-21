import { NextResponse } from 'next/server';
import { type NextFetchEvent, type NextRequest } from 'next/server';

import { type CustomMiddleware } from './middlewareChain';

export const BlockAuthorizedMiddleware = (middleware: CustomMiddleware) => {
  return (req: NextRequest, evt: NextFetchEvent, resp: NextResponse) => {
    console.log('block auth middleware');
    const { cookies } = req;
    const h_sid = cookies.get('h_sid');
    const coder_session_token = cookies.get('coder_session_token');
    if (Boolean(h_sid) || Boolean(coder_session_token)) {
      const { sourcePage } = evt;
      console.log({ sourcePage });
      //return NextResponse.redirect(new URL('/', req.url));
    }
    return middleware(req, evt, resp);
  };
};

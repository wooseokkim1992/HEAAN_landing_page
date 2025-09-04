import { NextResponse } from 'next/server';

import { CustomMiddleware } from '@middlewares/middlewareChain';

import type { NextFetchEvent, NextRequest } from 'next/server';

export const routeMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    // const token = request.cookies.get("accessToken");
    console.log('route middleware');
    const { pathname } = request.nextUrl;
    const isFile = pathname.match(/\.(.*)$/);

    // 정적 파일 요청
    if (isFile) {
      return NextResponse.next();
    }

    return middleware(request, event, response);
  };
};

import { NextResponse } from 'next/server';

import { CustomMiddleware } from '@/middlewares/middlewareChain';

import type { NextFetchEvent, NextRequest } from 'next/server';

export const routeMiddleware = (middleware: CustomMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    // const token = request.cookies.get("accessToken");

    const { pathname } = request.nextUrl;
    const isFile = pathname.match(/\.(.*)$/);

    // 정적 파일 요청
    if (isFile) {
      return NextResponse.next();
    }

    // 비회원 접근 방지
    // if (!token && pathname === "/my/user") {
    //   const mainUrl = new URL("/", request.url);
    //   return NextResponse.redirect(mainUrl);
    // }

    // if (!token && pathname === "/payments/pricing") {
    //   const mainUrl = new URL("/", request.url);
    //   return NextResponse.redirect(mainUrl);
    // }

    return middleware(request, event, response);
  };
};

export const config = {
  matcher: ['/', '/payments/billing', '/my/payments-dashboard'],
};

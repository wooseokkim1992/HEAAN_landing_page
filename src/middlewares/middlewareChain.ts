import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextResponse } from 'next/server';
import { NextMiddlewareWithAuth } from 'next-auth/middleware';

import type { NextFetchEvent, NextRequest } from 'next/server';

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse,
) =>
  | NextMiddlewareResult
  | NextMiddlewareWithAuth
  | Promise<NextMiddlewareResult | NextMiddlewareWithAuth>;

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

// middleware chaining
export function middlewareChain(functions: MiddlewareFactory[], index = 0): CustomMiddleware {
  const current = functions[index];

  if (current) {
    const next = middlewareChain(functions, index + 1);
    return current(next);
  }

  return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    return response;
  };
}

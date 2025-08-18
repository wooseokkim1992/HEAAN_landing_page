/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { http, HttpResponse } from 'msw';

const getUserInfoApi = http.get<{}, undefined, { message: string }, '/user-info'>(
  '/user-info',
  ({ params, request, cookies }) => {
    return HttpResponse.json({ message: 'success' }, { status: 200 });
  },
);

export const handlers = [getUserInfoApi];

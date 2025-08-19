import axios from 'axios';

export const authInstance = axios.create({
  baseURL: `/auth`,
  withCredentials: true,
});

authInstance.interceptors.request.use(
  function (request) {
    return request;
  },
  function (err) {
    throw err;
  },
);

authInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    throw err;
  },
);

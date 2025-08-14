import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.publicURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// export const tokenInstance = axios.create({
//   baseURL: process.env.publicURL,
//   timeout: 60000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

/* request interceptors */
// tokenInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = getCookie(COOKIE_OPTIONS.accessToken);
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (err) => Promise.reject(err),
// );

/* response interceptors */
// tokenInstance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const { response, config } = err;
//     if (response.status === 403) {
//       window.alert("로그인 정보가 없습니다. 다시 로그인해 주세요.");
//       removeCookie(COOKIE_OPTIONS.accessToken);
//       removeCookie(COOKIE_OPTIONS.refreshToken);
//       window.location.replace(PATH_LIST.signIn);
//     } else {
//       Promise.reject(err);
//     }
//   },
// );

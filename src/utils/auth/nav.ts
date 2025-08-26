import { NAV_LIST } from '@/constants/commonConstants';
import { type TResCheckUser } from '@/typings/auth';
import { type NavType, type MenuType } from '@/typings/commonTypes';

import { getRequiredCookies, convertIntoCookieStr, getUserInfo } from './checkUser';
type keyOfNavType = keyof NavType;

export const filterOutTopNav = (user: TResCheckUser | undefined): [keyOfNavType, MenuType][] => {
  return Object.entries(NAV_LIST).filter(
    (elem) =>
      elem[1].restriction === (Boolean(user) ? 'AUTH' : 'NOT_AUTH') ||
      elem[1].restriction === 'NONE',
  ) as [keyOfNavType, MenuType][];
};

export const checkAuth = async () => {
  try {
    const cookieObj = await getRequiredCookies({ names: ['coder_session_token', 'h_sid'] });
    if (cookieObj === null) {
      throw new Error('no proper cookies');
    } else if (cookieObj) {
      const cookieStr = convertIntoCookieStr(cookieObj);
      return await getUserInfo(cookieStr);
    }
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const getLinkBtnFromNavList = (user: TResCheckUser | undefined) => {
  const navList = filterOutTopNav(user);
  return {
    links: navList.filter(([_, val]) => val.componentType === 'LINK'),
    buttons: navList.filter(([_, val]) => val.componentType === 'BUTTON'),
  };
};

import { PATH_LIST } from '@/constants/commonConstants';

export interface LayoutProps {
  children: React.ReactNode;
}
export type PathUrlType = (typeof PATH_LIST)[keyof typeof PATH_LIST];

export type TermsType = {
  title: string;
  updated: string;
  content: string;
};

export type MenuType = {
  title: string;
  url: string;
  _blank: boolean;
};

export type NavType = {
  [key: string]: MenuType & {
    subMenu: MenuType[];
  };
};

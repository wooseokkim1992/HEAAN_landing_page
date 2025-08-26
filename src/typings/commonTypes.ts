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
  title?: string;
  url: string;
  _blank: boolean;
  restriction: 'AUTH' | 'NOT_AUTH' | 'NONE';
  componentType: 'LINK' | 'BUTTON';
  subMenu?: MenuType[];
};

type TopNavKeys = Exclude<
  keyof typeof PATH_LIST,
  | 'confirmAccount'
  | 'resetPassword'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'softwareLicense'
  | 'tossWidget'
  | 'paypalWidget'
  | 'internationalPaymentWidget'
  | 'termsAndConditions'
  | 'signUp'
  | 'main'
>;

export type NavType = {
  [key in Partial<TopNavKeys>]: MenuType;
};

import { NavType } from '@/types/commonTypes';

export const PATH_LIST = {
  main: '/',
  signIn: '/sign-in',
  //signIn: `${process.env.NEXT_PUBLIC_CODER_DOMAIN}/api/v2/users/oidc/callback`,
  signOut: `${process.env.NEXT_PUBLIC_OIDC_DOMAIN}/session/end`,
  termsAndConditions: '/terms-and-conditions',
  signUp: '/sign-up',
  confirmAccount: '/confirm-account',
  resetPassword: '/reset-password',
  termsOfService: '/terms-of-service',
  privacyPolicy: '/privacy-policy',
  softwareLicense: '/software-license',
  pricing: '/payments/pricing',
  myPage: '/my/user',
  tossWidget: '/payments/toss',
  paypalWidget: '/payments/paypal',
  internationalPaymentWidget: '/payments/international',
  theHeaanBook: 'https://docs.heaan.io',
  gpuGuide: 'https://guide.heaan.io',
} as const;

export const BTN_TEXT = {
  signIn: 'Sign In',
  signOut: 'Sign Out',
  goToWorkspace: 'Go to Workspace',
  createAccount: 'Create an Account',
  resetPassword: 'Reset Password',
  confirmAccount: 'Confirm Account',
  resendCode: 'Resend Code',
  changePassword: 'Change Password',
  getVerificationCode: 'Send Code',
  next: 'Next',
  cancel: 'Cancel',
  startForFree: 'Access Beta for Free',
  pricing: 'Pricing',
  myPage: 'My Page',
  tossWidget: 'Proceed to Payment',
  paypalWidget: 'Paypal',
  internationalPaymentWidget: 'International Payment',
  theHeaanBook: 'The HEaaN Book',
  gpuGuide: "GPU Developer's Guide",
};

export const INPUT_LABELS = {
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  newPassword: 'New Password',
  verificationCode: 'Verification Code',
  name: 'Name',
  occupation: 'Occupation',
};

export const PLACEHOLDERS = {
  email: 'account@email.com',
  password: 'Password',
  confirmPassword: 'Confirm Password',
  verificationCode: 'Enter Code',
  name: 'Enter Your Name',
  occupation: 'Occupation',
  selectVersion: 'Select Version',
};

export const SUB_TEXT = {
  email: {
    default: '',
    invalidInput: 'Please enter a valid email address.',
  },
  password: {
    default: 'At least 12 characters, including uppercase, lowercase, number, and symbol.',
    invalidInput: 'Please enter a password that meets all the requirements.',
  },
  confirmPassword: {
    default: '',
    mismatch: 'Passwords do not match.',
  },
  verificationCode: {
    default: '',
    invalidInput: 'Invalid verification code.',
  },
  name: {
    default: '',
    empty: 'Please enter your name.',
  },
  occupation: {
    default: '',
    empty: 'Please enter your occupation.',
  },
};

export const ALERT_MSG = {
  signIn: {
    incorrectInfo: 'Incorrect username or password',
    invalidAccess: 'Invalid access path. Redirecting to the main page.',
  },
  resetPassword: {
    success: 'Your password has been successfully reset. Please log in.',
  },
  sendCode: {
    success: 'A verification code has been sent. Please check your email.',
  },
  auth: {
    invalidSession: 'Your session is no longer valid. Please log in again.',
    permissionDenied:
      'You do not have permission to access this page. Redirecting to the main page.',
  },
};

export const NAV_LIST: NavType = {
  pricing: {
    title: BTN_TEXT.pricing,
    url: PATH_LIST.pricing,
    _blank: false,
    subMenu: [],
  },
  gpuGuide: {
    title: BTN_TEXT.gpuGuide,
    url: PATH_LIST.gpuGuide,
    _blank: true,
    subMenu: [],
  },
  theHeaanBook: {
    title: BTN_TEXT.theHeaanBook,
    url: PATH_LIST.theHeaanBook,
    _blank: true,
    subMenu: [],
  },
};

export const FOOTER_NAV_LIST = [
  {
    name: 'Privacy Policy',
    path: PATH_LIST.privacyPolicy,
  },
  {
    name: 'Terms of Service',
    path: PATH_LIST.termsOfService,
  },
  {
    name: 'Software License',
    path: PATH_LIST.softwareLicense,
  },
];

export const FOOTER_CONTENTS = {
  copyright: '© 2025 CryptoLab, Inc. All Rights Reserved.',
  contacts: 'info@cryptolab.co.kr',
};

export const REG_EXP = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/,
};

export const TERMS_TEXT = {
  agreeToAll: 'I agree to all the terms and conditions',
  agree: 'I agree',
  adult: 'I am 18 years of age or older.',
  betaService: 'I understand that this is a beta service and that my workspace may be deleted.',
};

export const SESSION_STORAGE_VAL = {
  required: 'required',
  true: 'true',
  false: 'false',
};

export const SUCCESSED = 'successed';

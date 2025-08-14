'use client';

import { Amplify, ResourcesConfig } from 'aws-amplify';

const amplifyConfiguration: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
};

Amplify.configure(amplifyConfiguration, {
  ssr: true,
});

interface AmplifyConfigurationProps {
  children: React.ReactNode;
}

const AmplifyConfiguration = ({ children }: AmplifyConfigurationProps) => {
  return children;
};

export default AmplifyConfiguration;

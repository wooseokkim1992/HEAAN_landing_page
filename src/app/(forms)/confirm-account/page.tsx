import { Suspense } from 'react';

import ConfirmAccount from './ConfirmAccount';
const page = () => {
  return (
    <Suspense>
      <ConfirmAccount />
    </Suspense>
  );
};

export default page;

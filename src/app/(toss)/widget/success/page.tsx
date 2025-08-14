import { Suspense } from 'react';

import PaymentsSuccess from '@/app/(toss)/widget/success/PaymentsSuccess';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentsSuccess />
    </Suspense>
  );
};

export default page;

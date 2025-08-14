import { Suspense } from "react";

import ConfirmAccount from "@/app/(forms)/confirm-account/ConfirmAccount";

const page = () => {
  return (
    <Suspense>
      <ConfirmAccount />
    </Suspense>
  );
};

export default page;

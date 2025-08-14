import { Suspense } from "react";

import SignIn from "@/app/(forms)/sign-in/SignIn";

const Page = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};

export default Page;

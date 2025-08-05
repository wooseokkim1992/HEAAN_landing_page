import Link from 'next/link';

import TempLogin from '@components/main/TempLogin';
export default function Home() {
  return (
    <div className="block w-dvw h-dvh bg-orange-100">
      <TempLogin />
      <Link className="w-[120px]" prefetch={false} href={`/api/callback`}>
        go to workspace
      </Link>
    </div>
  );
}

export const signOutInServer = async ({ cookieStr }: { cookieStr: string }) => {
  console.log({ cookieStr });
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStr,
    },
    signal: AbortSignal.timeout(100000),
  });
  console.log({ resp });
  if (!resp.ok) {
    throw resp.json();
  }
  return resp;
};
